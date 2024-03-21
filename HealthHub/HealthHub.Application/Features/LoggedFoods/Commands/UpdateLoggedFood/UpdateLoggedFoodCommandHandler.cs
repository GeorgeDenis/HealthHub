using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Commands.UpdateLoggedFood
{
    public class UpdateLoggedFoodCommandHandler : IRequestHandler<UpdateLoggedFoodCommand, UpdateLoggedFoodCommandResponse>
    {
        private readonly ILoggedFoodRepository loggedFoodRepository;
        public UpdateLoggedFoodCommandHandler(ILoggedFoodRepository loggedFoodRepository)
        {
            this.loggedFoodRepository = loggedFoodRepository;
        }
        public async Task<UpdateLoggedFoodCommandResponse> Handle(UpdateLoggedFoodCommand request, CancellationToken cancellationToken)
        {
            var loggedFood = await loggedFoodRepository.FindByIdAsync(request.LoggedFoodId);
            if (!loggedFood.IsSuccess)
            {
                return new UpdateLoggedFoodCommandResponse { Message = "Logged food not found", Success = false };

            }
            if (loggedFood.Value.UserId != request.UserId)
            {
                return new UpdateLoggedFoodCommandResponse { Message = "Unauthorized", Success = false };
            }

            request.ServingSize ??= loggedFood.Value.ServingSize;
            request.NumberOfServings ??= loggedFood.Value.NumberOfServings;
            request.MealType ??= loggedFood.Value.MealType;
            request.Name ??= loggedFood.Value.Name;
            request.Calories ??= loggedFood.Value.Calories;
            request.Protein ??= loggedFood.Value.Protein;
            request.Carbohydrates ??= loggedFood.Value.Carbohydrates;
            request.Fat ??= loggedFood.Value.Fat;

            loggedFood.Value.Update(request.ServingSize, request.NumberOfServings, (Domain.Entities.Enums.MealType)request.MealType, request.Name, request.Calories.Value, request.Protein.Value, request.Carbohydrates.Value, request.Fat.Value);
            var updateResponse = await loggedFoodRepository.UpdateAsync(loggedFood.Value);
            if(!updateResponse.IsSuccess)
            {
                return new UpdateLoggedFoodCommandResponse { Message = "Failed to update logged food", Success = false };
            }
            return new UpdateLoggedFoodCommandResponse { Message = "Logged food updated successfully", Success = true };



        }
    }

}
