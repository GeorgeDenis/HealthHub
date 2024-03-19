using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Queries.GetRecentLoggedCardioExercises
{
    public class GetRecentLoggedCardioExercisesQueryHandler : IRequestHandler<GetRecentLoggedCardioExercisesQuery, GetRecentLoggedCardioExercisesQueryResponse>
    {
        private readonly ILoggedCardioExerciseRepository loggedCardioExerciseRepository;
        public GetRecentLoggedCardioExercisesQueryHandler(ILoggedCardioExerciseRepository loggedCardioExerciseRepository)
        {
            this.loggedCardioExerciseRepository = loggedCardioExerciseRepository;
        }
        public async Task<GetRecentLoggedCardioExercisesQueryResponse> Handle(GetRecentLoggedCardioExercisesQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetRecentLoggedCardioExercisesQueryValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new GetRecentLoggedCardioExercisesQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }

            var loggedCardioExercises = await loggedCardioExerciseRepository.GetRecentLoggedCardioExercises(request.UserId);
            if (!loggedCardioExercises.IsSuccess)
            {
                return new GetRecentLoggedCardioExercisesQueryResponse
                {
                    Success = false,
                    Message = "An error occurred while retrieving logged cardio exercises."
                };
            }
            return new GetRecentLoggedCardioExercisesQueryResponse
            {
                Success = true,
                LoggedCardioExercises = loggedCardioExercises.Value,
            };

        }
    }
}
