using MediatR;

namespace HealthHub.Application.Features.LoggedWaterEntries.Queries.GetLoggedWaterByUserIdAndDate
{
    public class GetLoggedWaterByUserIdAndDateQuery : IRequest<GetLoggedWaterByUserIdAndDateQueryResponse>
    {
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
