using HealthHub.Application.Models.Identity;

namespace HealthHub.Application.Contracts.Identity
{
    public interface IAuthService
    {
        Task<(int, string)> Registeration(RegistrationModel model, string role);
        Task<(int, string)> Login(LoginModel model);
        Task<(int, string)> Logout();
        Task<(int, string)> ResetPassword(ResetPasswordModel model);

    }
}
