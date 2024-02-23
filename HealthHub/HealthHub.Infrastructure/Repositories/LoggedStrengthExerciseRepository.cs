﻿using HealthHub.Application.Features.LoggedStrengthExercises;
using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure.Repositories
{
    public class LoggedStrengthExerciseRepository : BaseRepository<LoggedStrengthExercise>, ILoggedStrengthExerciseRepository
    {
        public LoggedStrengthExerciseRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<Result<List<LoggedStrengthExercisesDto>>> GetByUserIdAndDateAsync(Guid userId, DateTime date)
        {

            var dayStart = date.Date; 
            var dayEnd = dayStart.AddDays(1); 

            var loggedStrengthExercises = await context.LoggedStrengthExercises
                .Where(x => x.UserId == userId && x.DateLogged >= dayStart && x.DateLogged < dayEnd)
                .Select(x => new LoggedStrengthExercisesDto
                {
                    LoggedStrengthExerciseId = x.LoggedStrengthExerciseId,
                    UserId = x.UserId,
                    Name = x.Name,
                    MuscleGroup = x.MuscleGroup,
                    NumberOfSets = x.NumberOfSets,
                    WeightPerSet = x.WeightPerSet,
                    DateLogged = x.DateLogged
                }).ToListAsync();


            return Result<List<LoggedStrengthExercisesDto>>.Success(loggedStrengthExercises);
            
           
        }

  
    }
}
