using MediatR;

namespace HealthHub.Application.Features.Badges.Commands.CreateBadgeCommand
{
    public class CreateBadgeCommand : IRequest<CreateBadgeCommandResponse>
    {
        public string Name { get; set; } = string.Empty;
        public int Count { get; set; }
        public Guid UserId { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
