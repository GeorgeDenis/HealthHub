using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate
{
    public class GetLoggedFoodByUserIdAndDateQueryHandler : IRequestHandler<GetLoggedFoodByUserIdAndDateQuery, GetLoggedFoodByUserIdAndDateQueryResponse>
    {
        private readonly ILoggedFoodRepository loggedFoodRepository;
        public GetLoggedFoodByUserIdAndDateQueryHandler(ILoggedFoodRepository loggedFoodRepository)
        {
            this.loggedFoodRepository = loggedFoodRepository;
        }
        public async Task<GetLoggedFoodByUserIdAndDateQueryResponse> Handle(GetLoggedFoodByUserIdAndDateQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLoggedFoodByUserIdAndDateQueryValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new GetLoggedFoodByUserIdAndDateQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var utcDate = request.Date.ToUniversalTime();
            var loggedFoods = await loggedFoodRepository.GetByUserIdAndDateAsync(request.UserId, utcDate);
            if (!loggedFoods.IsSuccess)
            {
                return new GetLoggedFoodByUserIdAndDateQueryResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Error retrieving logged foods" }
                };
            }
            return new GetLoggedFoodByUserIdAndDateQueryResponse
            {
                Success = true,
                LoggedFoods = loggedFoods.Value.ToList()
            };
        }
    }

}
