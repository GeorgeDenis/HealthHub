using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Commands.CreateLoggedCardioExercises
{
    public  class CreateLoggedCardioExerciseCommand : IRequest<CreateLoggedCardioExerciseCommandResponse>
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public int CaloriesBurned { get; set; }
        public DateTime DateLogged { get; set; }
    }
}
