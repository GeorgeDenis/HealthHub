using MediatR;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurements
{
    public class GetLoggedMeasurementsQuery : IRequest<GetLoggedMeasurementsQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
