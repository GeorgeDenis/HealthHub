using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetRecentLoggedFoodByUserId
{
    public class GetRecentLoggedFoodByUserIdQueryHandler : IRequestHandler<GetRecentLoggedFoodByUserIdQuery, GetRecentLoggedFoodByUserIdQueryResponse>
    {
        private readonly ILoggedFoodRepository loggedFoodRepository;

        public GetRecentLoggedFoodByUserIdQueryHandler(ILoggedFoodRepository loggedFoodRepository)
        {
            this.loggedFoodRepository = loggedFoodRepository;
        }

        public async Task<GetRecentLoggedFoodByUserIdQueryResponse> Handle(GetRecentLoggedFoodByUserIdQuery request, CancellationToken cancellationToken)
         {
            var validator = new GetRecentLoggedFoodByUserIdQueryValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new GetRecentLoggedFoodByUserIdQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }

            var loggedFoods = await loggedFoodRepository.GetRecentLoggedFoodByUserId(request.UserId);
            if (!loggedFoods.IsSuccess)
            {
                return new GetRecentLoggedFoodByUserIdQueryResponse
                {
                    Success = false,
                    Message = "An error occurred while retrieving logged foods."
                };
            }
            return new GetRecentLoggedFoodByUserIdQueryResponse
            {
                Success = true,
                LoggedFoods = [.. loggedFoods.Value],
            };

        }

    }
}
