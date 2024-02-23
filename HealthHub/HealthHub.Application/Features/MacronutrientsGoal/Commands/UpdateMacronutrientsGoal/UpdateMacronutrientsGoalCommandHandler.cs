using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.MacronutrientsGoal.Commands.UpdateMacronutrientsGoal
{
    public class UpdateMacronutrientsGoalCommandHandler : IRequestHandler<UpdateMacronutrientsGoalCommand, UpdateMacronutrientsGoalCommandResponse>
    {
        private readonly IMacronutrientsGoalRepository macronutrientsGoalRepository;
        public UpdateMacronutrientsGoalCommandHandler(IMacronutrientsGoalRepository macronutrientsGoalRepository)
        {
            this.macronutrientsGoalRepository = macronutrientsGoalRepository;
        }
        public async Task<UpdateMacronutrientsGoalCommandResponse> Handle(UpdateMacronutrientsGoalCommand request, CancellationToken cancellationToken)
        {
            var validationResult = new UpdateMacronutrientsGoalCommandValidator().Validate(request);
            if (!validationResult.IsValid)
            {
                return new UpdateMacronutrientsGoalCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var result = await macronutrientsGoalRepository.GetByUserIdAsync(request.UserId);
            if (result == null)
            {
                return new UpdateMacronutrientsGoalCommandResponse
                {
                    Success = false,
                    Message = $"Macronutrients goal for user with id {request.UserId} not found"
                };
            }
            request.Protein = request.Protein == null || request.Protein == 0 ? result.Value.ProteinPercent : request.Protein;
            request.Carbohydrates = request.Carbohydrates == null || request.Carbohydrates == 0 ? result.Value.CarbohydratesPercent : request.Carbohydrates;
            request.Fat = request.Fat == null || request.Fat == 0 ? result.Value.FatsPercent : request.Fat;

            if ((request.Protein.Value + request.Carbohydrates.Value + request.Fat.Value) != 100)
            {
                return new UpdateMacronutrientsGoalCommandResponse
                {
                    Success = false,
                    Message = "The sum of protein, carbohydrates, and fat must be 100."
                };
            }

            result.Value.Update(request.Protein.Value, request.Carbohydrates.Value, request.Fat.Value);
            await macronutrientsGoalRepository.UpdateAsync(result.Value);
            return new UpdateMacronutrientsGoalCommandResponse
            {
                Success = true
            };
        }
    }
}
