using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetLoggedMeasurements
{
    public class GetLoggedMeasurementsQueryResponse : BaseResponse
    {
        public GetLoggedMeasurementsQueryResponse() : base()
        {
        }
        public List<LoggedMeasurementsDto> LoggedMeasurements { get; set; } = [];


    }
}