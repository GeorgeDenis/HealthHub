using HealthHub.Application.Features.LoggedStrengthExercises.Commands.CreateLoggedStrengthExercise;
using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetLoggedStrengthExerciseByUserIdAndDate
{
    public class GetLoggedStrengthExerciseByUserIdAndDateQueryHandler : IRequestHandler<GetLoggedStrengthExerciseByUserIdAndDateQuery, GetLoggedStrengthExerciseByUserIdAndDateQueryResponse>
    {
        private readonly ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository;
        public GetLoggedStrengthExerciseByUserIdAndDateQueryHandler(ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository)
        {
            this.loggedStrengthExerciseRepository = loggedStrengthExerciseRepository;
        }
        public async Task<GetLoggedStrengthExerciseByUserIdAndDateQueryResponse> Handle(GetLoggedStrengthExerciseByUserIdAndDateQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLoggedStrengthExerciseByUserIdAndDateQueryValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new GetLoggedStrengthExerciseByUserIdAndDateQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var utcDate = request.Date.ToUniversalTime();

            var loggedStrengthExercises = await loggedStrengthExerciseRepository.GetByUserIdAndDateAsync(request.UserId, utcDate);
            if (!loggedStrengthExercises.IsSuccess)
            {
                return new GetLoggedStrengthExerciseByUserIdAndDateQueryResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Error retrieving logged strength exercises" }
                };
            }
            return new GetLoggedStrengthExerciseByUserIdAndDateQueryResponse
            {
                Success = true,
                LoggedStrengthExercises = loggedStrengthExercises.Value.ToList()
            };
        }
    }
}
