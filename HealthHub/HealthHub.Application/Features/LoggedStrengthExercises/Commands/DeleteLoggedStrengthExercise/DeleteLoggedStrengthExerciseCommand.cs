using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Commands.DeleteLoggedStrengthExercise
{
    public class DeleteLoggedStrengthExerciseCommand : IRequest<DeleteLoggedStrengthExerciseCommandResponse>
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
    }
}
