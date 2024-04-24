using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.Users.Queries.GetUserSearchFiltered
{
    public class GetUserSearchFilteredQueryHandler : IRequestHandler<GetUserSearchFilteredQuery, GetUserSearchFilteredQueryResponse>
    {
        private readonly IUserManager userManager;
        public GetUserSearchFilteredQueryHandler(IUserManager userManager)
        {
            this.userManager = userManager;
        }
        public async Task<GetUserSearchFilteredQueryResponse> Handle(GetUserSearchFilteredQuery request, CancellationToken cancellationToken)
        {
            var allUsers = await userManager.GetAllAsync();
            if (!allUsers.IsSuccess)
            {
                return new GetUserSearchFilteredQueryResponse
                {
                    Success = false,
                    Message = allUsers.Error
                };
            }
            var usersFiltered = allUsers.Value.Where(u =>
                    (!string.IsNullOrWhiteSpace(u.Username) && u.Username.ToLower().Contains(request.SearchValue.ToLower())) ||
                    (!string.IsNullOrWhiteSpace(u.Name) && u.Name.ToLower().Contains(request.SearchValue.ToLower()))
                ).ToArray();

            return new GetUserSearchFilteredQueryResponse
            {
                Success = true,
                Users = usersFiltered.Select(u => new UserSearchDto
                {
                    UserId = u.UserId,
                    Username = u.Username,
                    Email = u.Email,
                    ProfilePictureUrl = u.ProfilePictureUrl
                }).Take(25).ToList()
            };
        }
    }
}
