using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.Users.Queries.GetUserSearchFiltered
{
    public class GetUserSearchFilteredQueryResponse : BaseResponse
    {
        public GetUserSearchFilteredQueryResponse() : base()
        {
        }
        public List<UserSearchDto> Users { get; set; } = new List<UserSearchDto>();
    }
}