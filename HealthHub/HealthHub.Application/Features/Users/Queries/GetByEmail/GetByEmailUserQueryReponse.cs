using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.Users.Queries.GetByEmail
{
    public class GetByEmailUserQueryReponse : BaseResponse
    {
        public GetByEmailUserQueryReponse() : base()
        {

        }
        public UserDto User { get; set; } = new();
    }
}