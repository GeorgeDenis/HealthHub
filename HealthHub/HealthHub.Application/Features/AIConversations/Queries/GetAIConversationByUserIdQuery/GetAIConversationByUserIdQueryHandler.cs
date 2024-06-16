using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByUserIdQuery
{
    public class GetAIConversationByUserIdQueryHandler : IRequestHandler<GetAIConversationByUserIdQuery, GetAIConversationByUserIdQueryResponse>
    {
        private readonly IAIConversationRepository aiConversationRepository;
        private readonly IUserManager userManager;
        public GetAIConversationByUserIdQueryHandler(IAIConversationRepository aIConversationRepository,IUserManager userManager)
        {
            this.aiConversationRepository = aIConversationRepository;
            this.userManager = userManager;
        }
        public async Task<GetAIConversationByUserIdQueryResponse> Handle(GetAIConversationByUserIdQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetAIConversationByUserIdQueryValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return new GetAIConversationByUserIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var userExists = await userManager.FindByIdAsync(request.UserId);
            if (!userExists.IsSuccess)
            {
                return new GetAIConversationByUserIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "User not found" }
                };
            }
            var aiConversations = await aiConversationRepository.GetByUserIdAsync(request.UserId);
            if (!aiConversations.IsSuccess)
            {
                return new GetAIConversationByUserIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Conversations not found" }
                };
            }
            return new GetAIConversationByUserIdQueryResponse
            {
                Success = true,
                AIConversationDtos = aiConversations.Value.Select(ai => new AIConversationDto
                {
                    Id = ai.AIConversationId,
                    Name = ai.Name,
                    UserId = ai.UserId,
                    DateSent = ai.DateSent,
                }).ToArray()
            };

        }
    }
}
