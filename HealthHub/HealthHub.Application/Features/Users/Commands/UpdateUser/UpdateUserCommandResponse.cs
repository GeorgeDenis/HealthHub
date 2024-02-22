using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserCommandResponse : BaseResponse
    {
        public UpdateUserCommandResponse() : base()
        {
        }

        public UpdateUserDto User { get; set; } = new();
    }
}