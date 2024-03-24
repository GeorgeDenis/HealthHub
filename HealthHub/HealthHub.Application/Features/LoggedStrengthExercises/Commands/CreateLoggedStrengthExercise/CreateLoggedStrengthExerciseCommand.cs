using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Commands.CreateLoggedStrengthExercise
{
    public class CreateLoggedStrengthExerciseCommand : IRequest<CreateLoggedStrengthExerciseCommandResponse>
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string MuscleGroup { get; set; }
        public int NumberOfSets { get; set; }
        public string WeightPerSet { get; set; }
    }
}
