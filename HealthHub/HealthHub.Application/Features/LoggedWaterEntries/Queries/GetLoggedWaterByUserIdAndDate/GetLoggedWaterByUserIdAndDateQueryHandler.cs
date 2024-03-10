using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
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
                var logNewWaterIntake = LoggedWater.Create(request.UserId, 0, request.Date);
                if (!logNewWaterIntake.IsSuccess)
                {
                    return new GetLoggedWaterByUserIdAndDateQueryResponse
                    {
                        Success = false,
                        ValidationsErrors = new List<string> { logNewWaterIntake.Error }
                    };
                }
                await loggedWaterRepository.AddAsync(logNewWaterIntake.Value);
                return new GetLoggedWaterByUserIdAndDateQueryResponse
                {
                    Success = true,
                    LoggedWater = new LoggedWaterDto
                    {
                        Id = logNewWaterIntake.Value.LoggedWaterId,
                        UserId = request.UserId,
                        Amount = 0,
                        DateLogged = request.Date
                    }
                };
            }
            return new GetLoggedWaterByUserIdAndDateQueryResponse
            {
                Success = true,
                LoggedWater = new LoggedWaterDto
                {
                    Id = loggedWater.LoggedWaterId,
                    UserId = request.UserId,
                    Amount = loggedWater.Amount,
                    DateLogged = loggedWater.DateLogged
                }
            };
        }
    }
}
