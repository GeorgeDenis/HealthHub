using MediatR;

namespace HealthHub.Application.Features.Users.Queries.GetUserSearchFiltered
{
    public class GetUserSearchFilteredQuery : IRequest<GetUserSearchFilteredQueryResponse>
    {
        public string SearchValue { get; set; } = String.Empty;
    }
}
