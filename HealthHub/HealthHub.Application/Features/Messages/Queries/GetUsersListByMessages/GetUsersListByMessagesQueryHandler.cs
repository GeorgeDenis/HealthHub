using HealthHub.Application.Models;
using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using MediatR;

namespace HealthHub.Application.Features.Messages.Queries.GetUsersListByMessages
{
    public class GetUsersListByMessagesQueryHandler : IRequestHandler<GetUsersListByMessagesQuery, GetUsersListByMessagesQueryResponse>
    {
        private readonly IMessageRepository messageRepository;
        private readonly IUserManager userManager;
        public GetUsersListByMessagesQueryHandler(IMessageRepository messageRepository, IUserManager userManager)
        {
            this.messageRepository = messageRepository;
            this.userManager = userManager;
        }

        public async Task<GetUsersListByMessagesQueryResponse> Handle(GetUsersListByMessagesQuery request, CancellationToken cancellationToken)
        {
            var usersList = await messageRepository.GetUsersListByMessages(request.UserId);
            var users = new List<UserMessageProfileDto>();
            foreach (var user in usersList.Value)
            {
                var userDto = await userManager.FindByIdAsync(user);
                users.Add(new UserMessageProfileDto
                {
                    UserId = Guid.Parse(userDto.Value.UserId),
                    Username = userDto.Value.Username,
                    ProfilePictureUrl = userDto.Value.ProfilePictureUrl
                });
            }
            return new GetUsersListByMessagesQueryResponse { 
                Success = true,
                Users = users
            };
            
        }
    }
}
