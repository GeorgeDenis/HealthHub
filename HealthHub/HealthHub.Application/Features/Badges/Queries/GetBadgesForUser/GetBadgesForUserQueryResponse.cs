using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.Badges.Queries.GetBadgesForUser
{
    public class GetBadgesForUserQueryResponse : BaseResponse
    {
        public GetBadgesForUserQueryResponse() : base()
        {
        }
        public BadgeDto[] Badges { get; set; }
    }
}