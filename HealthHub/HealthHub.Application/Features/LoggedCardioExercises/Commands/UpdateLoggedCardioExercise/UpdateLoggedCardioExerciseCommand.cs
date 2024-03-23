using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Commands.UpdateLoggedCardioExercise
{
    public class UpdateLoggedCardioExerciseCommand : IRequest<UpdateLoggedCardioExerciseCommandResponse>
    {
        public Guid LoggedCardioExerciseId { get; set; }
        public Guid UserId { get; set; }
        public string? Name { get; set; }
        public int? Duration { get; set; }
        public int? CaloriesBurned { get; set; }
    }
}
