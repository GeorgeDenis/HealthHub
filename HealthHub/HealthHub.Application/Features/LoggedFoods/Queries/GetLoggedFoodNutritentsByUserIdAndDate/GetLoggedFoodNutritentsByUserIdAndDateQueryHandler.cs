using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodNutritentsByUserIdAndDate
{
    public class GetLoggedFoodNutritentsByUserIdAndDateQueryHandler : IRequestHandler<GetLoggedFoodNutritentsByUserIdAndDateQuery, GetLoggedFoodNutritentsByUserIdAndDateQueryResponse>
    {
        private readonly ILoggedFoodRepository loggedFoodRepository;
        public GetLoggedFoodNutritentsByUserIdAndDateQueryHandler(ILoggedFoodRepository loggedFoodRepository)
        {
            this.loggedFoodRepository = loggedFoodRepository;
        }
        public async Task<GetLoggedFoodNutritentsByUserIdAndDateQueryResponse> Handle(GetLoggedFoodNutritentsByUserIdAndDateQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLoggedFoodNutritentsByUserIdAndDateQueryValidator();
            var valdatorResult = await validator.ValidateAsync(request);
            if (!valdatorResult.IsValid)
            {
                return new GetLoggedFoodNutritentsByUserIdAndDateQueryResponse()
                {
                    Success = false,
                    ValidationsErrors = valdatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedFood = await loggedFoodRepository.GetByUserIdAndDateAsync(request.UserId, request.DateLogged);
            int totalCalories = 0;
            int totalCarbs = 0;
            int totalProtein = 0;
            int totalFat = 0;
            foreach (var food in loggedFood.Value)
            {
                totalCalories += food.Calories;
                totalCarbs += food.Carbohydrates;
                totalProtein += food.Protein;
                totalFat += food.Fat;
            }
            return new GetLoggedFoodNutritentsByUserIdAndDateQueryResponse()
            {
                Success = true,
                LoggedFoodNutrients = new LoggedFoodNutrientsDto()
                {
                    Calories = totalCalories,
                    Carbohydrates = totalCarbs,
                    Protein = totalProtein,
                    Fat = totalFat
                }
            };
        }
    }

}
