using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetRecentLoggedStrengthExercises
{
    public class GetRecentLoggedStrengthExercisesQueryHandler : IRequestHandler<GetRecentLoggedStrengthExercisesQuery, GetRecentLoggedStrengthExercisesQueryResponse>
    {
        private readonly ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository;
        public GetRecentLoggedStrengthExercisesQueryHandler(ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository)
        {
            this.loggedStrengthExerciseRepository = loggedStrengthExerciseRepository;
        }

        public async Task<GetRecentLoggedStrengthExercisesQueryResponse> Handle(GetRecentLoggedStrengthExercisesQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetRecentLoggedStrengthExercisesQueryValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new GetRecentLoggedStrengthExercisesQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedStrengthExercises = await loggedStrengthExerciseRepository.GetRecentLoggedStrengthExercises(request.UserId);
            if (!loggedStrengthExercises.IsSuccess)
            {
                return new GetRecentLoggedStrengthExercisesQueryResponse
                {
                    Success = false,
                    Message = "An error occurred while retrieving logged strength exercises."
                };
            }
            return new GetRecentLoggedStrengthExercisesQueryResponse
            {
                Success = true,
                LoggedStrengthExercises = loggedStrengthExercises.Value,
            };

        }
    }

}
