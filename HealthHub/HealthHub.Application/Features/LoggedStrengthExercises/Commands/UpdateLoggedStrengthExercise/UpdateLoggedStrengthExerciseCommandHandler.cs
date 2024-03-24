using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Commands.UpdateLoggedStrengthExercise
{
    public class UpdateLoggedStrengthExerciseCommandHandler : IRequestHandler<UpdateLoggedStrengthExerciseCommand, UpdateLoggedStrengthExerciseCommandResponse>
    {
        private readonly ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository;
        public UpdateLoggedStrengthExerciseCommandHandler(ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository)
        {
            this.loggedStrengthExerciseRepository = loggedStrengthExerciseRepository;
        }
        public async Task<UpdateLoggedStrengthExerciseCommandResponse> Handle(UpdateLoggedStrengthExerciseCommand request, CancellationToken cancellationToken)
        {
            var loggedStrengthExercise = await loggedStrengthExerciseRepository.FindByIdAsync(request.LoggedStrengthExerciseId);
            if (!loggedStrengthExercise.IsSuccess)
            {
                return new UpdateLoggedStrengthExerciseCommandResponse { Message = "Logged strength exercise not found", Success = false };

            }
            if (loggedStrengthExercise.Value.UserId != request.UserId)
            {
                return new UpdateLoggedStrengthExerciseCommandResponse { Message = "Unauthorized", Success = false };
            }

            request.Name ??= loggedStrengthExercise.Value.Name;
            request.MuscleGroup ??= loggedStrengthExercise.Value.MuscleGroup;
            request.NumberOfSets ??= loggedStrengthExercise.Value.NumberOfSets;
            request.WeightPerSet ??= loggedStrengthExercise.Value.WeightPerSet;

            loggedStrengthExercise.Value.Update(request.Name, request.MuscleGroup, request.NumberOfSets.Value, request.WeightPerSet);
            var updateResponse = await loggedStrengthExerciseRepository.UpdateAsync(loggedStrengthExercise.Value);
            if (!updateResponse.IsSuccess)
            {
                return new UpdateLoggedStrengthExerciseCommandResponse { Message = "Failed to update logged strength exercise", Success = false };
            }
            return new UpdateLoggedStrengthExerciseCommandResponse { Message = "Logged strength exercise updated successfully", Success = true };
        }
    }

}
