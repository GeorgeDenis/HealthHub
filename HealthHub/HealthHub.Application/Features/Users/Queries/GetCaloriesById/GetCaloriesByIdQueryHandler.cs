using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.Users.Queries.GetCaloriesById
{
    public class GetCaloriesByIdQueryHandler : IRequestHandler<GetCaloriesByIdQuery, GetCaloriesByIdQueryResponse>
    {
        private readonly IUserManager userRepository;

        public GetCaloriesByIdQueryHandler(IUserManager userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<GetCaloriesByIdQueryResponse> Handle(GetCaloriesByIdQuery request, CancellationToken cancellationToken)
        {
            var userResult = await userRepository.FindByIdAsync(request.UserId);
            if (!userResult.IsSuccess)
            {
                return ResponseWithError("The user does not exist!");
            }
            UserDto userDto = new UserDto
            {
                UserId = userResult.Value.UserId,
                Gender = userResult.Value.Gender,
                Height = userResult.Value.Height,
                DateOfBirth = userResult.Value.DateOfBirth,
                Activity = userResult.Value.Activity,
                CurrentWeight = userResult.Value.CurrentWeight,
                GoalType = userResult.Value.GoalType,
                WeeklyGoal = userResult.Value.WeeklyGoal
            };
            var validationResponse = ValidateUserData(userDto);
            if (validationResponse != null)
            {
                return validationResponse;
            }

            int bmr = CalculateBMR(userDto);

            bmr = AdjustForActivityLevel(bmr, (ActivityLevel)userDto.Activity);
            bmr = AdjustForGoalType(bmr, (GoalType)userDto.GoalType, userResult.Value.WeeklyGoal);

            return new GetCaloriesByIdQueryResponse { Success = true, Calories = bmr };
        }


        private GetCaloriesByIdQueryResponse ValidateUserData(UserDto user)
        {
            if (user.CurrentWeight == null)
                return ResponseWithError("The user has not set their current weight!");
            if (user.Height == null)
                return ResponseWithError("The user has not set their height!");
            if (user.Gender == null)
                return ResponseWithError("The user has not set their gender!");
            if (user.DateOfBirth == null)
                return ResponseWithError("The user has not set their date of birth!");
            if (user.Activity == 0)
                return ResponseWithError("The user has not set their activity level!");
            if (user.GoalType == 0)
                return ResponseWithError("The user has not set their goal type!");
            if (user.WeeklyGoal == null)
                return ResponseWithError("The user has not set their weekly goal!");

            return null; 
        }

        private int CalculateBMR(UserDto user)
        {
            if(user.CurrentWeight == null || user.Height == null || user.DateOfBirth == null)
                return 0;
            int age = DateTime.Now.Year - user.DateOfBirth.Value.Year;

            if (DateTime.Now < new DateTime(DateTime.Now.Year, user.DateOfBirth.Value.Month, user.DateOfBirth.Value.Day))
            {
                age--; 
            }

            return user.Gender == Gender.Male
                ? (int)((10 * user.CurrentWeight) + (6.25 * user.Height) - (5 * age) + 5)
                : (int)((10 * user.CurrentWeight) + (6.25 * user.Height) - (5 * age) - 161);
        }

        private int AdjustForActivityLevel(int bmr, ActivityLevel activityLevel)
        {
            return activityLevel switch
            {
                ActivityLevel.NotVeryActive => (int)(bmr * 1.2),
                ActivityLevel.LightlyActive => (int)(bmr * 1.375),
                ActivityLevel.Active => (int)(bmr * 1.55),
                ActivityLevel.VeryActive => (int)(bmr * 1.725),
                _ => bmr
            };
        }

        private int AdjustForGoalType(int bmr, GoalType goalType, double? weeklyGoal)
        {
            int weeklyGoalCalories = (int)(weeklyGoal.GetValueOrDefault() * 500);
            return goalType switch
            {
                GoalType.LoseWeight => bmr - weeklyGoalCalories,
                GoalType.GainWeight => bmr + weeklyGoalCalories,
                _ => bmr
            };
        }

        private GetCaloriesByIdQueryResponse ResponseWithError(string message)
        {
            return new GetCaloriesByIdQueryResponse { Success = false, Message = message };
        }
    }
}
