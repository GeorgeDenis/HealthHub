using MediatR;

namespace HealthHub.Application.Features.ResetCode.Commands.CreateResetCode
{
    public class CreateResetCodeCommand : IRequest<CreateResetCodeCommandResponse>
    {
        public string Email { get; set; } = string.Empty;
    }
}
