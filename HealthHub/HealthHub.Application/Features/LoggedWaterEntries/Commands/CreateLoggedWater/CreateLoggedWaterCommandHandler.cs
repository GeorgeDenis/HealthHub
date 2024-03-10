using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.LoggedWaterEntries.Commands.CreateLoggedWater
{
    public class CreateLoggedWaterCommandHandler : IRequestHandler<CreateLoggedWaterCommand, CreateLoggedWaterCommandResponse>
    {
        private readonly ILoggedWaterRepository loggedWaterRepository;
        public CreateLoggedWaterCommandHandler(ILoggedWaterRepository loggedWaterRepository)
        {
            this.loggedWaterRepository = loggedWaterRepository;
        }
        public async Task<CreateLoggedWaterCommandResponse> Handle(CreateLoggedWaterCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateLoggedWaterCommandValidator();
            var validationResult = await validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return new CreateLoggedWaterCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedWater = LoggedWater.Create(request.UserId, request.Amount, request.Date);
            if (!loggedWater.IsSuccess)
            {
                return new CreateLoggedWaterCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { loggedWater.Error }
                };
            }
            var alreadyLogged = await loggedWaterRepository.GetByUserIdAndDate(request.UserId, DateTime.UtcNow);
            if (alreadyLogged != null)
            {
                var updatedLoggedWater = alreadyLogged.Update(loggedWater.Value.Amount + request.Amount);
                if (!updatedLoggedWater.IsSuccess)
                {
                    return new CreateLoggedWaterCommandResponse
                    {
                        Success = false,
                        ValidationsErrors = new List<string> { updatedLoggedWater.Error }
                    };
                }
                var updateResult = await loggedWaterRepository.UpdateAsync(updatedLoggedWater.Value);
                if (!updateResult.IsSuccess)
                {
                    return new CreateLoggedWaterCommandResponse
                    {
                        Success = false,
                        ValidationsErrors = new List<string> { "Something went wrong while updating the water." }
                    };
                }
                return new CreateLoggedWaterCommandResponse
                {
                    Success = true,
                };
            }
            var result = await loggedWaterRepository.AddAsync(loggedWater.Value);
            if (!result.IsSuccess)
            {
                return new CreateLoggedWaterCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Something went wrong while logging the water." }
                };
            }
            return new CreateLoggedWaterCommandResponse
            {
                Success = true,
            };
        }
    }
}
