using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Commands.DeleteLoggedFood
{
    public class DeleteLoggedFoodCommandHandler : IRequestHandler<DeleteLoggedFoodCommand, DeleteLoggedFoodCommandResponse>
    {
        private readonly ILoggedFoodRepository loggedFoodRepository;
        public DeleteLoggedFoodCommandHandler(ILoggedFoodRepository loggedFoodRepository)
        {
            this.loggedFoodRepository = loggedFoodRepository;
        }
        public async Task<DeleteLoggedFoodCommandResponse> Handle(DeleteLoggedFoodCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteLoggedFoodCommandValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new DeleteLoggedFoodCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedFood = await loggedFoodRepository.FindByIdAsync(request.LoggedFoodId);
            if (!loggedFood.IsSuccess)
            {
                return new DeleteLoggedFoodCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Logged food not found" }
                };
            }
            if(loggedFood.Value.UserId != request.UserId)
            {
                return new DeleteLoggedFoodCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "You didn't logged this food!" }
                };
            }
            var result = await loggedFoodRepository.DeleteAsync(loggedFood.Value.LoggedFoodId);
            if (!result.IsSuccess)
            {
                return new DeleteLoggedFoodCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Error deleting logged food" }
                };
            }
            return new DeleteLoggedFoodCommandResponse
            {
                Success = true
            };
        }
    }
}
