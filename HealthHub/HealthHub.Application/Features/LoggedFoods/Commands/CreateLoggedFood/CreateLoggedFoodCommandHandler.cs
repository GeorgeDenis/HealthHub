using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Commands.CreateLoggedFood
{
    public class CreateLoggedFoodCommandHandler : IRequestHandler<CreateLoggedFoodCommand, CreateLoggedFoodCommandResponse>
    {
        private readonly ILoggedFoodRepository loggedFoodRepository;

        public CreateLoggedFoodCommandHandler(ILoggedFoodRepository loggedFoodRepository)
        {
            this.loggedFoodRepository = loggedFoodRepository;
        }

        public async Task<CreateLoggedFoodCommandResponse> Handle(CreateLoggedFoodCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateLoggedFoodCommandValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new CreateLoggedFoodCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedFood = LoggedFood.Create(request.UserId,request.ServingSize,request.NumberOfServings,request.MealType,request.FoodName,request.Calories,request.Protein,request.Carbohydrates,request.Fat);
            var result = await loggedFoodRepository.AddAsync(loggedFood.Value);
            if (!result.IsSuccess)
            {
                return new CreateLoggedFoodCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Something went wrong while logging the food." }
                };
            }
            return new CreateLoggedFoodCommandResponse
            {
                Success = true,
            };
            
        }
    }

}
