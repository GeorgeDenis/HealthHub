using HealthHub.Application.Features.Users;
using HealthHub.Application.Models;
using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace HealthHub.Identity.Services
{
    public class ApplicationUserManager : IUserManager
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public ApplicationUserManager(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public async Task<Result<UserDto>> FindByIdAsync(Guid userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return Result<UserDto>.Failure($"User with id {userId} not found");
            }
            var userDtos = MapToUserDto(user);
            var roles = await userManager.GetRolesAsync(user);
            userDtos.Roles = roles.ToList();
            return Result<UserDto>.Success(userDtos);
        }
        public async Task<Result<UserDto>> FindByEmailAsync(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return Result<UserDto>.Failure($"User with email {email} not found");
            var userDtos = MapToUserDto(user);
            var roles = await userManager.GetRolesAsync(user);
            userDtos.Roles = roles.ToList();
            return Result<UserDto>.Success(userDtos);
        }
        public async Task<Result<UserDto>> FindByUsernameAsync(string username)
        {

            var user = await userManager.FindByNameAsync(username);
            if (user == null)
                return Result<UserDto>.Failure($"User with username {username} not found");
            var userDtos = MapToUserDto(user);
            var roles = await userManager.GetRolesAsync(user);
            userDtos.Roles = roles.ToList();
            return Result<UserDto>.Success(userDtos);
        }



        public async Task<Result<List<UserDto>>> GetAllAsync()
        {
            var users = userManager.Users.ToList();
            var userDtos = users.Select(u => MapToUserDto(u)).ToList();

            foreach (var userDto in userDtos)
            {
                if (userDto.UserId == null)
                {
                    continue; 
                }
                var appUser = await userManager.FindByIdAsync(userDto.UserId.ToString());
                if (appUser != null)
                {
                    var roles = await userManager.GetRolesAsync(appUser);
                    userDto.Roles = roles.ToList();
                }
            }

            return Result<List<UserDto>>.Success(userDtos);
        }


        public async Task<Result<UserDto>> DeleteAsync(Guid userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return Result<UserDto>.Failure($"User with id {userId} not found");

            var deleteResult = await userManager.DeleteAsync(user);
            if (!deleteResult.Succeeded)
                return Result<UserDto>.Failure($"User with id {userId} not deleted");

            return Result<UserDto>.Success(MapToUserDto(user));
        }


        public async Task<Result<UserDto>> UpdateAsync(UserDto user)
        {
            if (user == null || user.UserId == null)
                return Result<UserDto>.Failure("Provided user or user ID is null.");
            var userToUpdate = await userManager.FindByIdAsync(user.UserId.ToString());
            if (userToUpdate == null)
                return Result<UserDto>.Failure($"User with id {user.UserId} not found");

            UpdateUserProperties(userToUpdate, user);

            var updateResult = await userManager.UpdateAsync(userToUpdate);
            return updateResult.Succeeded ? Result<UserDto>.Success(MapToUserDto(userToUpdate)) : Result<UserDto>.Failure($"User with id {user.UserId} not updated");
        }

        public async Task<Result<UserDto>> UpdateRoleAsync(UserDto user, string role)
        {
            if (user == null || user.UserId == null)
                return Result<UserDto>.Failure("Provided user or user ID is null.");

            var userToUpdate = await userManager.FindByIdAsync(user.UserId.ToString());
            if (userToUpdate == null)
                return Result<UserDto>.Failure($"User with id {user.UserId} not found");

            if (role != "Admin" && role != "User")
                return Result<UserDto>.Failure($"Role {role} not found");

            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));

            if (await userManager.IsInRoleAsync(userToUpdate, role))
                return Result<UserDto>.Failure($"User with id {user.UserId} already has role {role}");

            var addToRoleResult = await userManager.AddToRoleAsync(userToUpdate, role);
            return addToRoleResult.Succeeded ? Result<UserDto>.Success(MapToUserDto(userToUpdate)) : Result<UserDto>.Failure($"User with id {user.UserId} not updated");
        }
        private void UpdateUserProperties(ApplicationUser user, UserDto userDto)
        {
            user.Name = userDto.Name;
            user.UserName = userDto.Username;
            user.Email = userDto.Email;
            user.Bio = userDto.Bio;
            user.Mobile = userDto.Mobile;
            user.Location = userDto.Location;
            user.StartingWeight = userDto.StartingWeight;
            user.CurrentWeight = userDto.CurrentWeight;
            user.GoalWeight = userDto.GoalWeight;
            user.WeeklyGoal = userDto.WeeklyGoal;
            user.Activity = (ActivityLevel)userDto.Activity;


        }
        private UserDto MapToUserDto(ApplicationUser user)
        {
            return new UserDto
            {
                UserId = user.Id,
                Name = user.Name,
                Username = user.UserName,
                Email = user.Email,
                Bio = user.Bio,
                Mobile = user.Mobile,
                Location = user.Location,
                StartingWeight = user.StartingWeight,
                CurrentWeight = user.CurrentWeight,
                GoalWeight = user.GoalWeight,
                WeeklyGoal = user.WeeklyGoal,
                Activity = (Application.Features.ActivityLevel)user.Activity,
            };
        }


    }
}
