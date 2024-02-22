using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.ResetCode.Queries.VerifyResetCode
{
    public class VerifyResetCodeQueryHandler : IRequestHandler<VerifyResetCodeQuery, VerifyResetCodeResponse>
    {
        private readonly IPasswordResetCodeRepository passwordResetCodeRepository;
        public VerifyResetCodeQueryHandler(IPasswordResetCodeRepository passwordResetCodeRepository)
        {
            this.passwordResetCodeRepository = passwordResetCodeRepository;
        }

        public async Task<VerifyResetCodeResponse> Handle(VerifyResetCodeQuery request, CancellationToken cancellationToken)
        {

            var hasValidCode = await passwordResetCodeRepository.HasValidCodeByEmailAsync(request.Email, request.Code);
            if (!hasValidCode)
            {
                return new VerifyResetCodeResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Invalid reset code or expired." }
                };

            }
            //await passwordResetCodeRepository.InvalidateExistingCodesAsync(request.Email);
            return new VerifyResetCodeResponse
            {
                Success = true
            };

        }
    }
}
