﻿using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.Users.Queries.GetAll
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, GetAllUsersResponse>
    {
        private readonly IUserManager userRepository;

        public GetAllUsersQueryHandler(IUserManager userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<GetAllUsersResponse> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            GetAllUsersResponse response = new();
            var result = await userRepository.GetAllAsync();
            if (result.IsSuccess)
            {
                response.Users = result.Value.Select(u => new UserDto
                {
                    UserId = u.UserId,
                    Name = u.Name,
                    Username = u.Username,
                    Email = u.Email,
                    Bio = u.Bio,
                    DateOfBirth = u.DateOfBirth,
                    Height = u.Height,
                    Gender = u.Gender,
                    Mobile = u.Mobile,
                    Location = u.Location,
                    StartingWeight = u.StartingWeight,
                    CurrentWeight = u.CurrentWeight,
                    GoalWeight = u.GoalWeight,
                    WeeklyGoal = u.WeeklyGoal,
                    GoalType = u.GoalType,
                    Activity = u.Activity,
                    ProfilePictureUrl = u.ProfilePictureUrl,                 
                    Roles = u.Roles
                }).ToList();
            }
            return response;
        }
    }
}
