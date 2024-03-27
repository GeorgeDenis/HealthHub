using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurementsForToday
{
    public class GetLoggedMeasurementsForTodayQueryResponse : BaseResponse
    {
        public GetLoggedMeasurementsForTodayQueryResponse() : base()
        {
        }
        public LoggedMeasurementsDto LoggedMeasurements { get; set; } = new LoggedMeasurementsDto();
    }
}