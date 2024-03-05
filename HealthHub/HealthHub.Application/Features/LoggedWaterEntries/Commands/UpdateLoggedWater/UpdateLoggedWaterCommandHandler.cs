using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedWaterEntries.Commands.UpdateLoggedWater
{
    public class UpdateLoggedWaterCommandHandler : IRequestHandler<UpdateLoggedWaterCommand, UpdateLoggedWaterCommandResponse>
    {
        private readonly ILoggedWaterRepository loggedWaterRepository;
        public UpdateLoggedWaterCommandHandler(ILoggedWaterRepository loggedWaterRepository)
        {
            this.loggedWaterRepository = loggedWaterRepository;
        }
        public async Task<UpdateLoggedWaterCommandResponse> Handle(UpdateLoggedWaterCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateLoggedWaterCommandValidator();
            var validationResult = await validator.ValidateAsync(request,cancellationToken);
            if(!validationResult.IsValid)
            {
                return new UpdateLoggedWaterCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedWater = await loggedWaterRepository.FindByIdAsync(request.LoggedWaterId);
            if(!loggedWater.IsSuccess)
            {
                return new UpdateLoggedWaterCommandResponse
                {
                    Success = false,
                    Message = "Logged water not found"
                };
            }
            if(loggedWater.Value.UserId != request.UserId)
            {
                return new UpdateLoggedWaterCommandResponse
                {
                    Success = false,
                    Message = "You cant edit another user logged water"
                };
            }
            loggedWater.Value.Update(request.Amount);
            var result = await loggedWaterRepository.UpdateAsync(loggedWater.Value);
            if(!result.IsSuccess)
            {
                return new UpdateLoggedWaterCommandResponse
                {
                    Success = false,
                    Message = "Error updating logged water"
                };
            }
            return new UpdateLoggedWaterCommandResponse
            {
                Success = true,
                Message = "Logged water updated"
            };
        }
    }
}
