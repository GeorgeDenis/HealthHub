using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.Users.Queries.GetById
{
    public class GetCaloriesByIdQueryHandler : IRequestHandler<GetByIdUserQuery, GetByIdUserQueryResponse>
    {
        private readonly IUserManager userRepository;

        public GetCaloriesByIdQueryHandler(IUserManager userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<GetByIdUserQueryResponse> Handle(GetByIdUserQuery request, CancellationToken cancellationToken)
        {
            var result = await userRepository.FindByIdAsync(Guid.Parse(request.UserId));

            if (!result.IsSuccess)
                return new GetByIdUserQueryResponse { Success = false, Message = result.Error };

            var userDto = result.Value;

            return new GetByIdUserQueryResponse
            {
                Success = true,
                User = new UserDto
                {
                    UserId = userDto.UserId,
                    Name = userDto.Name,
                    Username = userDto.Username,
                    Email = userDto.Email,
                    Bio = userDto.Bio,
                    Age = userDto.Age,
                    Height = userDto.Height,
                    Gender = userDto.Gender,
                    Mobile = userDto.Mobile,
                    Location = userDto.Location,
                    StartingWeight = userDto.StartingWeight,
                    CurrentWeight = userDto.CurrentWeight,
                    GoalWeight = userDto.GoalWeight,
                    WeeklyGoal = userDto.WeeklyGoal,
                    Activity = userDto.Activity,
                    GoalType = userDto.GoalType,
                    Roles = userDto.Roles,
                }
            };

        }
    }
}
