using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurements
{
    public class GetLoggedMeasurementsQueryHandler : IRequestHandler<GetLoggedMeasurementsQuery, GetLoggedMeasurementsQueryResponse>
    {
        private readonly ILoggedMeasurementsRepository loggedMeasurementsRepository;
        private readonly IUserRepository userRepository;
        public GetLoggedMeasurementsQueryHandler(ILoggedMeasurementsRepository loggedMeasurementsRepository, IUserRepository userRepository)
        {
            this.loggedMeasurementsRepository = loggedMeasurementsRepository;
            this.userRepository = userRepository;
        }
        public async Task<GetLoggedMeasurementsQueryResponse> Handle(GetLoggedMeasurementsQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLoggedMeasurementsQueryValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new GetLoggedMeasurementsQueryResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var user = await userRepository.FindByIdAsync(request.UserId);
            if (!user.IsSuccess)
            {
                return new GetLoggedMeasurementsQueryResponse
                {
                    Success = false,
                    ValidationsErrors = ["User not found"]
                };
            }
            var loggedMeasurements = await loggedMeasurementsRepository.GetLoggedMeasurementsByUserId(request.UserId);
            if (!loggedMeasurements.IsSuccess)
            {
                return new GetLoggedMeasurementsQueryResponse
                {
                    Success = false,
                    ValidationsErrors = ["Error while fetching logged measurements"]
                };
            }
            return new GetLoggedMeasurementsQueryResponse
            {
                Success = true,
                LoggedMeasurements = loggedMeasurements.Value
            };
        }
    }
}
