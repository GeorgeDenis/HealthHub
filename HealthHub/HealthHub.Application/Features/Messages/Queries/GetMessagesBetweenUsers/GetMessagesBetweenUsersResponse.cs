using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.Messages.Queries.GetMessagesBetweenUsers
{
    public class GetMessagesBetweenUsersResponse : BaseResponse
    {
        public GetMessagesBetweenUsersResponse() : base() { }
        public List<MessageDto> Messages { get; set; } = new List<MessageDto>();
    }
}