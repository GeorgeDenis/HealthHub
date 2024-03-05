using MediatR;

namespace HealthHub.Application.Features.LoggedWaterEntries.Commands.UpdateLoggedWater
{
    public class UpdateLoggedWaterCommand : IRequest<UpdateLoggedWaterCommandResponse>
    {
        public Guid LoggedWaterId { get; set; }
        public Guid UserId { get; set; }
        public float Amount { get; set; }
    }
}
