using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedWaterEntries.Queries.GetLoggedWaterByUserIdAndDate
{
    public class GetLoggedWaterByUserIdAndDateQueryResponse : BaseResponse
    {
        public GetLoggedWaterByUserIdAndDateQueryResponse() : base()
        {
        }
        public LoggedWaterDto LoggedWater { get; set; }
    }
}