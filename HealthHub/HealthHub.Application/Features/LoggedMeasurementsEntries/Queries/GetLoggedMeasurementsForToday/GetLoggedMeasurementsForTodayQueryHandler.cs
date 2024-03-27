using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurementsForToday
{
    public class GetLoggedMeasurementsForTodayQueryHandler : IRequestHandler<GetLoggedMeasurementsForTodayQuery, GetLoggedMeasurementsForTodayQueryResponse>
    {
        private readonly ILoggedMeasurementsRepository loggedMeasurementsRepository;
        private readonly IUserRepository userRepository;
        public GetLoggedMeasurementsForTodayQueryHandler(ILoggedMeasurementsRepository loggedMeasurementsRepository, IUserRepository userRepository)
        {
            this.loggedMeasurementsRepository = loggedMeasurementsRepository;
            this.userRepository = userRepository;
        }

        public async Task<GetLoggedMeasurementsForTodayQueryResponse> Handle(GetLoggedMeasurementsForTodayQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLoggedMeasurementsForTodayQueryValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new GetLoggedMeasurementsForTodayQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var user = await userRepository.FindByIdAsync(request.UserId);
            if (!user.IsSuccess)
            {
                return new GetLoggedMeasurementsForTodayQueryResponse
                {
                    Success = false,
                    ValidationsErrors = ["User not found"]
                };
            }
            var loggedMeasurements = await loggedMeasurementsRepository.GetLoggedMeasurementsByUserIdAndDate(request.UserId,DateTime.UtcNow);
            if (!loggedMeasurements.IsSuccess)
            {
                return new GetLoggedMeasurementsForTodayQueryResponse
                {
                    Success = false,
                    ValidationsErrors = ["Error while fetching logged measurements"]
                };
            }
            return new GetLoggedMeasurementsForTodayQueryResponse
            {
                Success = true,
                LoggedMeasurements = loggedMeasurements.Value
            };
        }
    }

}
