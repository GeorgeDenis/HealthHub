using HealthHub.Application.Models;
using HealthHub.Domain.Common;

namespace HealthHub.Application.Persistence
{
    public interface IUserManager
    {
        Task<Result<UserDto>> FindByIdAsync(Guid userId);
        Task<Result<UserDto>> FindByEmailAsync(string email);
        Task<Result<UserDto>> FindByUsernameAsync(string username);
        Task<Result<List<UserDto>>> GetAllAsync();
        Task<Result<UserDto>> DeleteAsync(Guid userId);
        Task<Result<UserDto>> UpdateAsync(UserDto user);
        Task<Result<UserDto>> UpdateRoleAsync(UserDto user, string role);

    }
}
