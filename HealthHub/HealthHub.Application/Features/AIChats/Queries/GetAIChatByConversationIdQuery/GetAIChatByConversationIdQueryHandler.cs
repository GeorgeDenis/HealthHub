using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.AIChats.Queries.GetAIChatByConversationIdQuery
{
    public class GetAIChatByConversationIdQueryHandler : IRequestHandler<GetAIChatByConversationIdQuery, GetAIChatByConversationIdQueryResponse>
    {
        private readonly IAIChatRepository aiChatRepository;
        public GetAIChatByConversationIdQueryHandler(IAIChatRepository aiChatRepository)
        {
            this.aiChatRepository = aiChatRepository;
        }
        public async Task<GetAIChatByConversationIdQueryResponse> Handle(GetAIChatByConversationIdQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetAIChatByConversationIdQueryValidator();
            var validationResult = await validator.ValidateAsync(request, cancellationToken);
            if(!validationResult.IsValid)
            {
                return new GetAIChatByConversationIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var aiChats = await aiChatRepository.FindByConversationIdAsync(request.AIConversationId);
            if (!aiChats.IsSuccess)
            {
                return new GetAIChatByConversationIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Conversation not found" }
                };
            }
            return new GetAIChatByConversationIdQueryResponse
            {
                Success = true,
                AIChats = aiChats.Value.Select(aiChat => new AIChatDto
                {
                    Id = aiChat.AiChatId,
                    UserId = aiChat.UserId,
                    Sender = aiChat.Sender,
                    Message = aiChat.Message,
                    AIConversationId = aiChat.AiConversationId
                }).ToList()
            };

        }
    }
}
