using MediatR;

namespace HealthHub.Application.Features.Badges.Commands.UpdateSpecialBadge
{
    public class UpdateSpecialBadgeCommand : IRequest<UpdateSpecialBadgeCommandResponse>
    {
        public Guid VoterId { get; set; }
        public Guid VotedId { get; set; }
        public string Type { get; set; } = string.Empty;
    }
}
