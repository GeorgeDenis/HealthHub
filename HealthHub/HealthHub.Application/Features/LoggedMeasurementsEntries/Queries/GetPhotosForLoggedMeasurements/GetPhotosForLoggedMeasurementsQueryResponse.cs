using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Queries.GetPhotosForLoggedMeasurements
{
    public class GetPhotosForLoggedMeasurementsQueryResponse : BaseResponse
    {
        public GetPhotosForLoggedMeasurementsQueryResponse() : base()
        {
        }
        public List<LoggedMeasurementPhotoDto> Photos { get; set; } = new List<LoggedMeasurementPhotoDto>();
    }
}