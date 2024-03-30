using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetPhotosForLoggedMeasurements
{
    public class GetPhotosForLoggedMeasurementsQueryHandler : IRequestHandler<GetPhotosForLoggedMeasurementsQuery, GetPhotosForLoggedMeasurementsQueryResponse>
    {
        private readonly ILoggedMeasurementsRepository loggedMeasurementsRepository;
        private readonly IUserRepository userRepository;
        public GetPhotosForLoggedMeasurementsQueryHandler(ILoggedMeasurementsRepository loggedMeasurementsRepository, IUserRepository userRepository)
        {
            this.loggedMeasurementsRepository = loggedMeasurementsRepository;
            this.userRepository = userRepository;
        }

        public async Task<GetPhotosForLoggedMeasurementsQueryResponse> Handle(GetPhotosForLoggedMeasurementsQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetPhotosForLoggedMeasurementsQueryValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new GetPhotosForLoggedMeasurementsQueryResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var userExists = await userRepository.FindByIdAsync(request.UserId);
            if (!userExists.IsSuccess)
            {
                return new GetPhotosForLoggedMeasurementsQueryResponse()
                {
                    Success = false,
                    ValidationsErrors = new List<string>() { "User does not exist" }
                };
            }
            var loggedMeasurements = await loggedMeasurementsRepository.GetLoggedMeasurementsByUserId(request.UserId);
            if (loggedMeasurements.Value.Count != 0)
            {
                if (request.UserId != loggedMeasurements.Value[0].UserId)
                {

                    return new GetPhotosForLoggedMeasurementsQueryResponse()
                    {
                        Success = false,
                        ValidationsErrors = new List<string>() { "User does not have access to this resource" }
                    };
                }
                var photos = loggedMeasurements.Value.Where(lm => lm.WeightPhotoUrl != null).Select(lm => new LoggedMeasurementPhotoDto()
                {

                    LoggedMeasurementId = lm.Id,
                    CloudUrl = lm.WeightPhotoUrl,
                    DateLogged = lm.DateLogged
                }).ToList();
                //var photos = loggedMeasurements.Value.Select(lm => new LoggedMeasurementPhotoDto()
                //{

                //    LoggedMeasurementId = lm.Id,
                //    CloudUrl = lm.WeightPhotoUrl,
                //    DateLogged = lm.DateLogged
                //}).ToList();
                return new GetPhotosForLoggedMeasurementsQueryResponse()
                {
                    Success = true,
                    Photos = photos
                };
            }
            return new GetPhotosForLoggedMeasurementsQueryResponse()
            {
                Success = true
            };

        }
    }

}
