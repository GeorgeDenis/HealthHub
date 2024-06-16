using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByIdQuery
{
    public class GetAIConversationByIdQueryHandler : IRequestHandler<GetAIConversationByIdQuery, GetAIConversationByIdQueryResponse>
    {
        private readonly IAIConversationRepository _AIConversationRepository;
        public GetAIConversationByIdQueryHandler(IAIConversationRepository aIConversationRepository)
        {
            _AIConversationRepository = aIConversationRepository;
        }
        public async Task<GetAIConversationByIdQueryResponse> Handle(GetAIConversationByIdQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetAIConversationByIdQueryValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return new GetAIConversationByIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var AIConversation = await _AIConversationRepository.FindByIdAsync(request.Id);
            if (!AIConversation.IsSuccess)
            {
                return new GetAIConversationByIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "AIConversation not found" }
                };
            }
            return new GetAIConversationByIdQueryResponse
            {
                Success = true,
                AIConversation = new AIConversationDto
                {
                    Id = AIConversation.Value.AIConversationId,
                    Name = AIConversation.Value.Name,
                    UserId = AIConversation.Value.UserId,
                    DateSent = AIConversation.Value.DateSent,
                } 
           
            };


        }
    }
}
