using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface IPasswordResetCodeRepository : IAsyncRepository<PasswordResetCode>
    {
        Task<bool> HasValidCodeByEmailAsync(string email, string code);
        Task InvalidateExistingCodesAsync(string email);
    }
}
