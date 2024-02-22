using MediatR;

namespace HealthHub.Application.Features.ResetCode.Queries.VerifyResetCode
{
    public class VerifyResetCodeQuery : IRequest<VerifyResetCodeResponse>
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}
