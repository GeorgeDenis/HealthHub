using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseByUserIdAndDate
{
    public class GetLoggedCardioExerciseByUserIdAndDateQueryHandler : IRequestHandler<GetLoggedCardioExerciseByUserIdAndDateQuery, GetLoggedCardioExerciseByUserIdAndDateQueryResponse>
    {
        private readonly ILoggedCardioExerciseRepository loggedCardioExerciseRepository;
        public GetLoggedCardioExerciseByUserIdAndDateQueryHandler(ILoggedCardioExerciseRepository loggedCardioExerciseRepository)
        {
            this.loggedCardioExerciseRepository = loggedCardioExerciseRepository;
        }

        public async Task<GetLoggedCardioExerciseByUserIdAndDateQueryResponse> Handle(GetLoggedCardioExerciseByUserIdAndDateQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLoggedCardioExerciseByUserIdAndDateQueryValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new GetLoggedCardioExerciseByUserIdAndDateQueryResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var utcDate = request.Date.ToUniversalTime();
            var loggedCardioExercises = await loggedCardioExerciseRepository.GetByUserIdAndDateAsync(request.UserId, utcDate);
            if (!loggedCardioExercises.IsSuccess)
            {
                return new GetLoggedCardioExerciseByUserIdAndDateQueryResponse()
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Error retrieving logged cardio exercises" }
                };
            }
            return new GetLoggedCardioExerciseByUserIdAndDateQueryResponse()
            {
                Success = true,
                LoggedCardioExercises = loggedCardioExercises.Value.ToList()
            };

        }
    }
}
