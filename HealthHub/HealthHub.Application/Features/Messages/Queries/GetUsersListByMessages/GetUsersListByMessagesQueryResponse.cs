using HealthHub.Application.Models;
using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.Messages.Queries.GetUsersListByMessages
{
    public class GetUsersListByMessagesQueryResponse : BaseResponse
    {
        public GetUsersListByMessagesQueryResponse() : base()
        {
        }
        public List<UserMessageProfileDto> Users { get; set; }
    }
}