using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Commands.DeleteLoggedCardioExercise
{
    public class DeleteLoggedCardioExerciseCommand : IRequest<DeleteLoggedCardioExerciseCommandResponse>
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

    }
}
