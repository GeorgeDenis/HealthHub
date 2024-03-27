using MediatR;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Commands.CreateLoggedMeasurements
{
    public class CreateLoggedMeasurementsCommand : IRequest<CreateLoggedMeasurementsCommandResponse>
    {
        public Guid UserId { get; set; }
        public float? Weight { get; set; }
        public float? WaistCircumference { get; set; }
        public float? HipCircumference { get; set; }
        public float? NeckCircumference { get; set; }
        public string? WeightPhotoUrl { get; set; }
    }
}
