using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.Users.Queries.GetById
{
    public class GetByIdUserQueryResponse : BaseResponse
    {
        public GetByIdUserQueryResponse() : base()
        {
        }

        public UserDto User { get; set; } = new();
    }
}
