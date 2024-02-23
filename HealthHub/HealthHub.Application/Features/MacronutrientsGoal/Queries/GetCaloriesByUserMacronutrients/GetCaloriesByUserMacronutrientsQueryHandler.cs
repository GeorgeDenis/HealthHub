using HealthHub.Application.Features.Users.Queries;
using HealthHub.Application.Features.Users.Queries.GetCaloriesById;
using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.MacronutrientsGoal.Queries.GetCaloriesByUserMacronutrients
{
    public class GetCaloriesByUserMacronutrientsQueryHandler : IRequestHandler<GetCaloriesByUserMacronutrientsQuery, GetCaloriesByUserMacronutrientsQueryResponse>
    {
        private readonly IMacronutrientsGoalRepository macronutrientsGoalRepository;
        public GetCaloriesByUserMacronutrientsQueryHandler(IMacronutrientsGoalRepository macronutrientsGoalRepository)
        {
            this.macronutrientsGoalRepository = macronutrientsGoalRepository;
        }
        public async Task<GetCaloriesByUserMacronutrientsQueryResponse> Handle(GetCaloriesByUserMacronutrientsQuery request, CancellationToken cancellationToken)
        {
            var validationResult = new GetCaloriesByUserMacronutrientsQueryValidator().Validate(request);
            if (!validationResult.IsValid)
            {
                return new GetCaloriesByUserMacronutrientsQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var result = await macronutrientsGoalRepository.GetByUserIdAsync(request.UserId);
            if (result == null)
            {
                return new GetCaloriesByUserMacronutrientsQueryResponse
                {
                    Success = false,
                    Message = $"Macronutrients goal for user with id {request.UserId} not found"
                };
            }
            
            return new GetCaloriesByUserMacronutrientsQueryResponse
            {
                Success = true,
                ProteinCalories = result.Value.ProteinPercent * request.Calories / 100 / 4,
                CarbohydratesCalories = result.Value.CarbohydratesPercent * request.Calories / 100 / 4,
                FatsCalories = result.Value.FatsPercent * request.Calories / 100 / 9
            };
        }

    }
}
