using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Commands.CreateLoggedStrengthExercise
{
    public class CreateLoggedStrengthExerciseCommandHandler : IRequestHandler<CreateLoggedStrengthExerciseCommand, CreateLoggedStrengthExerciseCommandResponse>
    {
        public readonly ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository;
        public CreateLoggedStrengthExerciseCommandHandler(ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository)
        {
            this.loggedStrengthExerciseRepository = loggedStrengthExerciseRepository;
        }

        public async Task<CreateLoggedStrengthExerciseCommandResponse> Handle(CreateLoggedStrengthExerciseCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateLoggedStrengthExerciseCommandValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new CreateLoggedStrengthExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedStrengthExercise = LoggedStrengthExercise.Create(request.UserId, request.Name, request.MuscleGroup, request.NumberOfSets, request.WeightPerSet,request.DateLogged);
            var result = await loggedStrengthExerciseRepository.AddAsync(loggedStrengthExercise.Value);
            if (!result.IsSuccess)
            {
                return new CreateLoggedStrengthExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Something went wrong while creating the logged strength exercise." }
                };
            }
            return new CreateLoggedStrengthExerciseCommandResponse
            {
                Success = true,
            };
        }
    }

}
