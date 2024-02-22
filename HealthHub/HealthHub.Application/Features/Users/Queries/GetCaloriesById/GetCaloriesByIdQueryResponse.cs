using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.Users.Queries.GetCaloriesById
{
    public class GetCaloriesByIdQueryResponse : BaseResponse
    {
        public GetCaloriesByIdQueryResponse() : base()
        {
        }
        public int Calories { get; set; }
    }
}