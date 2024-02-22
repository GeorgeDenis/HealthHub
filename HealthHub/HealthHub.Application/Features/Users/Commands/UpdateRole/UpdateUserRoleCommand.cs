using MediatR;

namespace HealthHub.Application.Features.Users.Commands.UpdateRole
{
    public class UpdateUserRoleCommand : IRequest<UpdateUserRoleCommandResponse>
    {
        public Guid UserId { get; set; } = Guid.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
