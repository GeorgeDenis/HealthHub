using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Commands.UpdateLoggedCardioExercise
{
    public class UpdateLoggedCardioExerciseCommandHandler : IRequestHandler<UpdateLoggedCardioExerciseCommand, UpdateLoggedCardioExerciseCommandResponse>
    {
        private readonly ILoggedCardioExerciseRepository loggedCardioExerciseRepository;
        public UpdateLoggedCardioExerciseCommandHandler(ILoggedCardioExerciseRepository loggedCardioExerciseRepository)
        {
            this.loggedCardioExerciseRepository = loggedCardioExerciseRepository;
        }
        public async Task<UpdateLoggedCardioExerciseCommandResponse> Handle(UpdateLoggedCardioExerciseCommand request, CancellationToken cancellationToken)
        {
            var loggedCardioExercise = await loggedCardioExerciseRepository.FindByIdAsync(request.LoggedCardioExerciseId);
            if (!loggedCardioExercise.IsSuccess)
            {
                return new UpdateLoggedCardioExerciseCommandResponse { Message = "Logged cardio exercise not found", Success = false };

            }
            if (loggedCardioExercise.Value.UserId != request.UserId)
            {
                return new UpdateLoggedCardioExerciseCommandResponse { Message = "Unauthorized", Success = false };
            }

            request.Name ??= loggedCardioExercise.Value.Name;
            request.Duration ??= loggedCardioExercise.Value.Duration;
            request.CaloriesBurned ??= loggedCardioExercise.Value.CaloriesBurned;

            loggedCardioExercise.Value.Update(request.Name, request.Duration.Value, request.CaloriesBurned.Value);
            var updateResponse = await loggedCardioExerciseRepository.UpdateAsync(loggedCardioExercise.Value);
            if (!updateResponse.IsSuccess)
            {
                return new UpdateLoggedCardioExerciseCommandResponse { Message = "Failed to update logged cardio exercise", Success = false };
            }
            return new UpdateLoggedCardioExerciseCommandResponse { Message = "Logged cardio exercise updated successfully", Success = true };
        }
    }

}
