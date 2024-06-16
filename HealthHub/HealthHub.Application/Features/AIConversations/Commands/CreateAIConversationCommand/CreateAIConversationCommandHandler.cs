using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.AIConversations.Commands.CreateAIConversationCommand
{
    public class CreateAIConversationCommandHandler : IRequestHandler<CreateAIConversationCommand, CreateAIConversationCommandResponse>
    {
        private readonly IAIConversationRepository aiConversationRepository;
        private readonly IUserManager userManager;
        public CreateAIConversationCommandHandler(IAIConversationRepository aiConversationRepository, IUserManager userManager)
        {
            this.aiConversationRepository = aiConversationRepository;
            this.userManager = userManager;
        }

        public async Task<CreateAIConversationCommandResponse> Handle(CreateAIConversationCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateAIConversationCommandValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return new CreateAIConversationCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var userExists = await userManager.FindByIdAsync(request.UserId);
            if (!userExists.IsSuccess)
            {
                return new CreateAIConversationCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "User not found" }
                };
            }

            var newAIConversation = AIConversation.Create(request.UserId, request.Name);
            if (!newAIConversation.IsSuccess)
            {
                return new CreateAIConversationCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { newAIConversation.Error }
                };
            }
            var addResponse = await aiConversationRepository.AddAsync(newAIConversation.Value);
            if(!addResponse.IsSuccess)
            {
                return new CreateAIConversationCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { addResponse.Error }
                };
            }
            return new CreateAIConversationCommandResponse
            {
                Success = addResponse.IsSuccess,
                Id = newAIConversation.Value.AIConversationId
            };

        }
    }

}
