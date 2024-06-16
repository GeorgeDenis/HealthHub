using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.AIChats.Queries.GetAIChatByIdQuery
{
    public class GetAIChatByIdQueryHandler : IRequestHandler<GetAIChatByIdQuery, GetAIChatByIdQueryResponse>
    {
        private readonly IAIChatRepository aiChatRepository;
        public GetAIChatByIdQueryHandler(IAIChatRepository aiChatRepository)
        {
            this.aiChatRepository = aiChatRepository;
        }
        public async Task<GetAIChatByIdQueryResponse> Handle(GetAIChatByIdQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetAIChatByIdQueryValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return new GetAIChatByIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var aiChat = await aiChatRepository.FindByIdAsync(request.Id);
            if (!aiChat.IsSuccess)
            {
                return new GetAIChatByIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Chat not found" }
                };
            }
            return new GetAIChatByIdQueryResponse
            {
                Success = true,
                AiChat = new AIChatDto
                {
                    Id = aiChat.Value.AiChatId,
                    UserId = aiChat.Value.UserId,
                    Sender = aiChat.Value.Sender,
                    Message = aiChat.Value.Message,
                    AIConversationId = aiChat.Value.AiConversationId
                }
            };
        }
    }
}
