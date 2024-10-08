﻿using HealthHub.Application.Responses;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Queries.GetLoggedStrengthExerciseByUserIdAndDate
{
    public class GetLoggedStrengthExerciseByUserIdAndDateQueryResponse : BaseResponse
    {
        public GetLoggedStrengthExerciseByUserIdAndDateQueryResponse() : base()
        {
        }

        public List<LoggedStrengthExerciseDto> LoggedStrengthExercises { get; set; }
    }
}