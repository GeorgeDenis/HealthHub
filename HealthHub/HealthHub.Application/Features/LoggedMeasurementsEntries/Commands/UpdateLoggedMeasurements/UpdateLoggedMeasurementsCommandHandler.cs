using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Commands.UpdateLoggedMeasurements
{
    public class UpdateLoggedMeasurementsCommandHandler : IRequestHandler<UpdateLoggedMeasurementsCommand, UpdateLoggedMeasurementsCommandResponse>
    {
        private readonly ILoggedMeasurementsRepository loggedMeasurementsRepository;
        private readonly IUserRepository userRepository;
        public UpdateLoggedMeasurementsCommandHandler(ILoggedMeasurementsRepository loggedMeasurementsRepository, IUserRepository userRepository)
        {
            this.loggedMeasurementsRepository = loggedMeasurementsRepository;
            this.userRepository = userRepository;
        }

        public async Task<UpdateLoggedMeasurementsCommandResponse> Handle(UpdateLoggedMeasurementsCommand request, CancellationToken cancellationToken)
        {
            var validator = new UpdateLoggedMeasurementsCommandValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new UpdateLoggedMeasurementsCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var user = await userRepository.FindByIdAsync(request.UserId);
            if (!user.IsSuccess)
            {
                return new UpdateLoggedMeasurementsCommandResponse
                {
                    Success = false,
                    ValidationsErrors = ["User with this id not found"]
                };
            }
            var loggedMeasurements = await loggedMeasurementsRepository.FindByIdAsync(request.Id);
            if (!loggedMeasurements.IsSuccess)
            {
                return new UpdateLoggedMeasurementsCommandResponse
                {
                    Success = false,
                    ValidationsErrors = ["Logged measurements with this id not found"]
                };
            }
            request.Weight ??= loggedMeasurements.Value.Weight;
            request.WaistCircumference ??= loggedMeasurements.Value.WaistCircumference;
            request.HipCircumference ??= loggedMeasurements.Value.HipCircumference;
            request.NeckCircumference ??= loggedMeasurements.Value.NeckCircumference;
            request.WeightPhotoUrl ??= loggedMeasurements.Value.WeightPhotoUrl;

            loggedMeasurements.Value.Update(request.Weight, request.WaistCircumference, request.HipCircumference, request.NeckCircumference, request.WeightPhotoUrl);
            var result = await loggedMeasurementsRepository.UpdateAsync(loggedMeasurements.Value);
            if (!result.IsSuccess)
            {
                return new UpdateLoggedMeasurementsCommandResponse
                {
                    Success = false,
                    ValidationsErrors = [result.Error]
                };
            }
            return new UpdateLoggedMeasurementsCommandResponse
            {
                Success = true
            };
        }
    }
}
