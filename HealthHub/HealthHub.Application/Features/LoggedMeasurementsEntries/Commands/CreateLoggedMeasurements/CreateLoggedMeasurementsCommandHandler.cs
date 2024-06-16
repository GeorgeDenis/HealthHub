using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.LoggedMeasurementsEntries.Commands.CreateLoggedMeasurements
{
    public class CreateLoggedMeasurementsCommandHandler : IRequestHandler<CreateLoggedMeasurementsCommand, CreateLoggedMeasurementsCommandResponse>
    {
        private readonly ILoggedMeasurementsRepository loggedMeasurementsRepository;
        private readonly IUserManager userRepository;
        public CreateLoggedMeasurementsCommandHandler(ILoggedMeasurementsRepository loggedMeasurementsRepository, IUserManager userRepository)
        {
            this.loggedMeasurementsRepository = loggedMeasurementsRepository;
            this.userRepository = userRepository;
        }

        public async Task<CreateLoggedMeasurementsCommandResponse> Handle(CreateLoggedMeasurementsCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateLoggedMeasurementsCommandValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new CreateLoggedMeasurementsCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }

            var loggedMeasurements = LoggedMeasurements.Create(request.UserId, request.Weight, request.WaistCircumference, request.HipCircumference, request.NeckCircumference, request.WeightPhotoUrl);
            if (!loggedMeasurements.IsSuccess)
            {
                return new CreateLoggedMeasurementsCommandResponse
                {
                    Success = false,
                    ValidationsErrors = [loggedMeasurements.Error]
                };
            }
            var result = await loggedMeasurementsRepository.AddAsync(loggedMeasurements.Value);
            if (!result.IsSuccess)
            {
                return new CreateLoggedMeasurementsCommandResponse
                {
                    Success = false,
                    ValidationsErrors = [result.Error]
                };
            }
            var user = await userRepository.FindByIdAsync(request.UserId);
            if (!user.IsSuccess)
            {
                return new CreateLoggedMeasurementsCommandResponse
                {
                    Success = false,
                    ValidationsErrors = ["User not found"]
                };
            }
            user.Value.CurrentWeight = request.Weight;
            var updateResult = await userRepository.UpdateAsync(user.Value);
            if (!updateResult.IsSuccess)
            {
                return new CreateLoggedMeasurementsCommandResponse
                {
                    Success = false,
                    ValidationsErrors = ["Failed to update user's current weight"]
                };
            }
            return new CreateLoggedMeasurementsCommandResponse
            {
                Success = true
            };
        }

    }
}
