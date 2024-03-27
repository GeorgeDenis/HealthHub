using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Commands.CreateLoggedCardioExercises
{
    public class CreateLoggedCardioExerciseCommandHandler : IRequestHandler<CreateLoggedCardioExerciseCommand, CreateLoggedCardioExerciseCommandResponse>
    {
        private readonly ILoggedCardioExerciseRepository loggedCardioExerciseRepository;
        public CreateLoggedCardioExerciseCommandHandler(ILoggedCardioExerciseRepository loggedCardioExerciseRepository)
        {
            this.loggedCardioExerciseRepository = loggedCardioExerciseRepository;
        }

        public async Task<CreateLoggedCardioExerciseCommandResponse> Handle(CreateLoggedCardioExerciseCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateLoggedCardioExerciseCommandValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if(!validatorResult.IsValid)
            {
                return new CreateLoggedCardioExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedCardioExercise = LoggedCardioExercise.Create(request.UserId, request.Name, request.Duration, request.CaloriesBurned,request.DateLogged);
            var result = await loggedCardioExerciseRepository.AddAsync(loggedCardioExercise.Value);
            if (!result.IsSuccess)
            {
                return new CreateLoggedCardioExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Something went wrong while creating the logged cardio exercise." }
                };
            }
            return new CreateLoggedCardioExerciseCommandResponse
            {
                Success = true,
            };

        }
    }

}
