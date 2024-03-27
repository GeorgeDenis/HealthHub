using MediatR;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurementsForToday
{
    public class GetLoggedMeasurementsForTodayQuery : IRequest<GetLoggedMeasurementsForTodayQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
