using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.Messages.Queries.GetMessagesBetweenUsers
{
    public class GetMessagesBetweenUsersQueryHandler : IRequestHandler<GetMessagesBetweenUsersQuery, GetMessagesBetweenUsersResponse>
    {
        private readonly IMessageRepository messageRepository;
        public GetMessagesBetweenUsersQueryHandler(IMessageRepository messageRepository)
        {
            this.messageRepository = messageRepository;
        }
        public async Task<GetMessagesBetweenUsersResponse> Handle(GetMessagesBetweenUsersQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetMessagesBetweenUsersQueryValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new GetMessagesBetweenUsersResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var messages = await messageRepository.GetMessagesBetweenUsers(request.User1, request.User2);
            if (!messages.IsSuccess)
            {
                return new GetMessagesBetweenUsersResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Error retrieving messages" }
                };
            }
            return new GetMessagesBetweenUsersResponse
            {
                Success = true,
                Messages = messages.Value
            };
        }
    }
}
