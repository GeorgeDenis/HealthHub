using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.AIChats.Commands.CreateAIConversationChat
{
    public class CreateAIChatCommandHandler : IRequestHandler<CreateAIChatCommand, CreateAIChatCommandResponse>
    {
        private readonly IAIConversationRepository aiConversationRepository;
        private readonly IAIChatRepository aiChatRepository;
        private readonly IUserManager userManager;
        public CreateAIChatCommandHandler(IAIConversationRepository aiConversationRepository, IAIChatRepository aIChatRepository, IUserManager userManager)
        {
            this.aiConversationRepository = aiConversationRepository;
            this.aiChatRepository = aIChatRepository;
            this.userManager = userManager;
        }


        public async Task<CreateAIChatCommandResponse> Handle(CreateAIChatCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateAIChatCommandValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return new CreateAIChatCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var userExists = await userManager.FindByIdAsync(request.UserId);
            if (!userExists.IsSuccess)
            {
                return new CreateAIChatCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "User not found" }
                };
            }
            var aiConversationExists = await aiConversationRepository.FindByIdAsync(request.AIConversationId);
            if (!aiConversationExists.IsSuccess)
            {
                return new CreateAIChatCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Conversation not found" }
                };
            }
            var aiChat = AIChat.Create(request.UserId,request.Message, request.Sender,request.AIConversationId);

            var result = await aiChatRepository.AddAsync(aiChat.Value);
            if (!result.IsSuccess)
            {
                return new CreateAIChatCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Failed to create chat" }
                };
            }
            return new CreateAIChatCommandResponse
            {
                Success = true,
                Id = aiChat.Value.AiChatId
            };
        }
    }

}
