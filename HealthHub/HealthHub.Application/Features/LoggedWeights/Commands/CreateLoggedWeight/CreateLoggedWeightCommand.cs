﻿using MediatR;

namespace HealthHub.Application.Features.LoggedWeights.Commands.CreateLoggedWeight
{
    public class CreateLoggedWeightCommand : IRequest<CreateLoggedWeightCommandResponse>
    {
        public Guid UserId { get; set; }
        public float Weight { get; set; }
    }
}
