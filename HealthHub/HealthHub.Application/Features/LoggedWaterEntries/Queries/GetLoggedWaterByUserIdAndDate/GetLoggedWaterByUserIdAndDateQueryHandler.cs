using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedWaterEntries.Queries.GetLoggedWaterByUserIdAndDate
{
    public class GetLoggedWaterByUserIdAndDateQueryHandler : IRequestHandler<GetLoggedWaterByUserIdAndDateQuery, GetLoggedWaterByUserIdAndDateQueryResponse>
    {
        private readonly ILoggedWaterRepository loggedWaterRepository;
        public GetLoggedWaterByUserIdAndDateQueryHandler(ILoggedWaterRepository loggedWaterRepository)
        {
            this.loggedWaterRepository = loggedWaterRepository;
        }

        public async Task<GetLoggedWaterByUserIdAndDateQueryResponse> Handle(GetLoggedWaterByUserIdAndDateQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLoggedWaterByUserIdAndDateQueryValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return new GetLoggedWaterByUserIdAndDateQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedWater = await loggedWaterRepository.GetByUserIdAndDate(request.UserId, request.Date);
            if (loggedWater == null)
            {
                return new GetLoggedWaterByUserIdAndDateQueryResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "No water logged for the given date." }
                };
            }
            return new GetLoggedWaterByUserIdAndDateQueryResponse
            {
                Success = true,
                LoggedWater = new LoggedWaterDto
                {
                    Id = request.UserId,
                    UserId = request.UserId,
                    Amount = loggedWater.Amount,
                    DateLogged = loggedWater.DateLogged
                }
            };
        }
    }
}
