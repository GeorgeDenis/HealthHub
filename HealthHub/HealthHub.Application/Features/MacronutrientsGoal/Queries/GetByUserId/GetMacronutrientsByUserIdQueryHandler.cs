using HealthHub.Application.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthHub.Application.Features.MacronutrientsGoal.Queries.GetByUserId
{
    public class GetMacronutrientsByUserIdQueryHandler : IRequestHandler<GetMacronutrientsByUserIdQuery, GetMacronutrientsByUserIdQueryResponse>
    {
        private readonly IMacronutrientsGoalRepository macronutrientsGoalRepository;
        public GetMacronutrientsByUserIdQueryHandler(IMacronutrientsGoalRepository macronutrientsGoalRepository)
        {
            this.macronutrientsGoalRepository = macronutrientsGoalRepository;
        }
        public async Task<GetMacronutrientsByUserIdQueryResponse> Handle(GetMacronutrientsByUserIdQuery request, CancellationToken cancellationToken)
        {
            var validationResult = new GetMacronutrientsByUserIdQueryValidator().Validate(request);
            if (!validationResult.IsValid)
            {
                return new GetMacronutrientsByUserIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var result = await macronutrientsGoalRepository.GetByUserIdAsync(request.UserId);
            if (result == null)
            {
                return new GetMacronutrientsByUserIdQueryResponse
                {
                    Success = false,
                    Message = $"Macronutrients goal for user with id {request.UserId} not found"
                };
            }
            return new GetMacronutrientsByUserIdQueryResponse
            {
                Success = true,
                MacronutrientsGoalDto = new MacronutrientsGoalDto
                {
                    Id = result.Value.MacronutrientsGoalId,
                    UserId = result.Value.UserId,
                    Protein = result.Value.ProteinPercent,
                    Carbohydrates = result.Value.CarbohydratesPercent,
                    Fats = result.Value.FatsPercent
                }
            };
            

        }
    }
}
