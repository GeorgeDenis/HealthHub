using MediatR;

namespace HealthHub.Application.Features.LoggedWaterEntries.Commands.CreateLoggedWater
{
    public class CreateLoggedWaterCommand : IRequest<CreateLoggedWaterCommandResponse>
    {
        public Guid UserId { get; set; }
        public float Amount { get; set; }
    }
}
