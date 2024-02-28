using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedWeights.Queries.GetLoggedWeightByUserId
{
    public class GetLoggedWeightByUserIdQueryHandler : IRequestHandler<GetLoggedWeightByUserIdQuery, GetLoggedWeightByUserIdQueryResponse>
    {
        private readonly ILoggedWeightRepository loggedWeightRepository;
        public GetLoggedWeightByUserIdQueryHandler(ILoggedWeightRepository loggedWeightRepository)
        {
            this.loggedWeightRepository = loggedWeightRepository;
        }
        public async Task<GetLoggedWeightByUserIdQueryResponse> Handle(GetLoggedWeightByUserIdQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLoggedWeightByUserIdQueryValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new GetLoggedWeightByUserIdQueryResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedWeights = await loggedWeightRepository.GetByUserIdAsync(request.UserId);
            if (!loggedWeights.IsSuccess)
            {
                return new GetLoggedWeightByUserIdQueryResponse()
                {
                    Success = false,
                    Message = "Logged weights not found"
                };
            }
            return new GetLoggedWeightByUserIdQueryResponse()
            {
                Success = true,
                LoggedWeights = loggedWeights.Value
            };

        }
    }
}
