using MediatR;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetPhotosForLoggedMeasurements
{
    public class GetPhotosForLoggedMeasurementsQuery : IRequest<GetPhotosForLoggedMeasurementsQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
