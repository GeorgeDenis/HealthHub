using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using MediatR;

namespace HealthHub.Application.Features.LoggedWeights.Commands.CreateLoggedWeight
{
    public class CreateLoggedWeightCommandHandler : IRequestHandler<CreateLoggedWeightCommand, CreateLoggedWeightCommandResponse>
    {
        private readonly ILoggedWeightRepository loggedWeightRepository;
        private readonly IUserRepository userRepository;
        public CreateLoggedWeightCommandHandler(ILoggedWeightRepository loggedWeightRepository, IUserRepository userRepository)
        {
            this.loggedWeightRepository = loggedWeightRepository;
            this.userRepository = userRepository;
        }

        public async Task<CreateLoggedWeightCommandResponse> Handle(CreateLoggedWeightCommand request, CancellationToken cancellationToken)
        {
            var validator = new CreateLoggedWeightCommandValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if (!validatorResult.IsValid)
            {
                return new CreateLoggedWeightCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var user = await userRepository.FindByIdAsync(request.UserId);
            if (!user.IsSuccess)
            {
                return new CreateLoggedWeightCommandResponse()
                {
                    Success = false,
                    Message = "User not found"
                };
            }
            var loggedWeight = LoggedWeight.Create(request.UserId, request.Weight);
            var result = await loggedWeightRepository.AddAsync(loggedWeight.Value);
            if (!result.IsSuccess)
            {
                return new CreateLoggedWeightCommandResponse()
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Something went wrong while creating the logged weight." }
                };
            }
            return new CreateLoggedWeightCommandResponse()
            {
                Success = true,
            };
        }
    }
}
