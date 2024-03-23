using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Commands.UpdateLoggedStrengthExercise
{
    public class UpdateLoggedStrengthExerciseCommand : IRequest<UpdateLoggedStrengthExerciseCommandResponse>
    {
        public Guid LoggedStrengthExerciseId { get; set; }
        public Guid UserId { get; set; }
        public string? Name { get; set; }
        public string? MuscleGroup { get; set; }
        public int? NumberOfSets { get; set; }
        public int? WeightPerSet { get; set; }
    }

}
