using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.Messages.Commands.CreateMessage
{
    public class CreateMessageCommandHandler : IRequestHandler<CreateMessageCommand, CreateMessageCommandResponse>
    {
        private readonly IMessageRepository messageRepository;
        public CreateMessageCommandHandler(IMessageRepository messageRepository)
        {
            this.messageRepository = messageRepository;
        }
        public async Task<CreateMessageCommandResponse> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateMessageCommandValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new CreateMessageCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var message = Message.Create(request.Sender, request.Receiver, request.Content);
            if (!message.IsSuccess)
            {
                return new CreateMessageCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { message.Error }
                };
            }
            var response = await messageRepository.AddAsync(message.Value);
            if(!response.IsSuccess)
            {
                return new CreateMessageCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { response.Error }
                };
            }
            return new CreateMessageCommandResponse
            {
                Success = true
            };
        }
    }
}
