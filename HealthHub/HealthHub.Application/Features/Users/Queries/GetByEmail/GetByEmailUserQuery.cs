using MediatR;

namespace HealthHub.Application.Features.Users.Queries.GetByEmail
{
    public class GetByEmailUserQuery : IRequest<GetByEmailUserQueryReponse>
    {
        public string Email { get; set; } = string.Empty;
    }
}
