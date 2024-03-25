using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDate
{
    public class GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryHandler : IRequestHandler<GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQuery, GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryResponse>
    {
        private readonly ILoggedCardioExerciseRepository loggedCardioExerciseRepository;
        public GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryHandler(ILoggedCardioExerciseRepository loggedCardioExerciseRepository)
        {
            this.loggedCardioExerciseRepository = loggedCardioExerciseRepository;
        }
        public async Task<GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryResponse> Handle(GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedCardioExercises = await loggedCardioExerciseRepository.GetByUserIdAndDateAsync(request.UserId, request.DateLogged);
            int caloriesBurned = 0;
            caloriesBurned = loggedCardioExercises.Value.Sum(e => e.CaloriesBurned); 
            return new GetLoggedCardioExerciseCaloriesBurnedByUserIdAndDateQueryResponse()
            {
                Success = true,
                CaloriesBurned = caloriesBurned
            };

        }
    }
}
