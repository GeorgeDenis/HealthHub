
using HealthHub.Application.Models;
using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.Users.Commands.UpdateUser
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UpdateUserCommandResponse>
    {
        private readonly IUserManager userRepository;

        public UpdateUserCommandHandler(IUserManager userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<UpdateUserCommandResponse> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {

            var user = await userRepository.FindByIdAsync(request.Id);
            if (!user.IsSuccess)
            {
                return new UpdateUserCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "User with id this does not exists" }
                };
            }

            request.Name ??= user.Value.Name;
            request.Username ??= user.Value.Username;
            request.Email ??= user.Value.Email;
            request.Bio ??= user.Value.Bio;
            request.Mobile ??= user.Value.Mobile;
            request.Location ??= user.Value.Location;
            request.DateOfBirth ??= user.Value.DateOfBirth;
            request.Height ??= user.Value.Height;
            request.Gender ??= user.Value.Gender;
            request.StartingWeight ??= user.Value.StartingWeight;
            request.CurrentWeight ??= user.Value.CurrentWeight;
            request.GoalWeight ??= user.Value.GoalWeight;
            request.WeeklyGoal ??= user.Value.WeeklyGoal;
            request.GoalType ??= user.Value.GoalType;
            request.Activity ??= user.Value.Activity;
            request.ProfilePhotoUrl ??= user.Value.ProfilePictureUrl;

            var validator = new UpdateUserCommandValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return new UpdateUserCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(x => x.ErrorMessage).ToList()
                };
            }

            var userByEmail = await userRepository.FindByEmailAsync(request.Email);
            if (userByEmail.IsSuccess && userByEmail.Value.UserId != user.Value.UserId)
            {

                return new UpdateUserCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Email already exists" }
                };
            }

            var userByUsername = await userRepository.FindByUsernameAsync(request.Username);
            if (userByUsername.IsSuccess && userByUsername.Value.UserId != user.Value.UserId)
            {
                return new UpdateUserCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Username already exists" }
                };
            }


            UserDto userDto = new()
            {
                UserId = user.Value.UserId,
                Name = request.Name,
                Username = request.Username,
                Email = request.Email,
                Bio = request.Bio,
                DateOfBirth = request.DateOfBirth,
                Height = request.Height,
                Gender = request.Gender,
                Mobile = request.Mobile,
                Location = request.Location,
                StartingWeight = request.StartingWeight,
                CurrentWeight = request.CurrentWeight,
                GoalWeight = request.GoalWeight,
                WeeklyGoal = request.WeeklyGoal,
                GoalType = request.GoalType,
                Activity = request.Activity,
                ProfilePictureUrl = request.ProfilePhotoUrl
            };

            var result = await userRepository.UpdateAsync(userDto);
            if (!result.IsSuccess)
            {
                return new UpdateUserCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { result.Error }
                };
            }

            return new UpdateUserCommandResponse
            {
                Success = true,
                User = new UpdateUserDto
                {
                    Name = result.Value.Name,
                    Username = result.Value.Username,
                    Email = result.Value.Email,
                    Bio = result.Value.Bio,
                    Mobile = result.Value.Mobile,
                    Location = result.Value.Location,
                    DateOfBirth = result.Value.DateOfBirth,
                    Height = result.Value.Height,
                    Gender = result.Value.Gender,
                    StartingWeight = result.Value.StartingWeight,
                    CurrentWeight = result.Value.CurrentWeight,
                    GoalWeight = result.Value.GoalWeight,
                    WeeklyGoal = result.Value.WeeklyGoal,
                    GoalType = result.Value.GoalType,
                    Activity = result.Value.Activity,
                    ProfilePictureUrl = result.Value.ProfilePictureUrl
                }
            };
        }
    }
}
