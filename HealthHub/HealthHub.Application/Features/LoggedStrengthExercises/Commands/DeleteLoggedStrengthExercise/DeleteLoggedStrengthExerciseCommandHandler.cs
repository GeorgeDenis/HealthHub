using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedStrengthExercises.Commands.DeleteLoggedStrengthExercise
{
    public class DeleteLoggedStrengthExerciseCommandHandler : IRequestHandler<DeleteLoggedStrengthExerciseCommand, DeleteLoggedStrengthExerciseCommandResponse>
    {
        private readonly ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository;
        public DeleteLoggedStrengthExerciseCommandHandler(ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository)
        {
            this.loggedStrengthExerciseRepository = loggedStrengthExerciseRepository;
        }
        public async Task<DeleteLoggedStrengthExerciseCommandResponse> Handle(DeleteLoggedStrengthExerciseCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteLoggedStrengthExerciseCommandValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new DeleteLoggedStrengthExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedStrengthExercise = await loggedStrengthExerciseRepository.FindByIdAsync(request.Id);
            if (!loggedStrengthExercise.IsSuccess)
            {
                return new DeleteLoggedStrengthExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Logged strength exercise not found" }
                };
            }
            if(loggedStrengthExercise.Value.UserId != request.UserId)
            {
                return new DeleteLoggedStrengthExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "You cant delete another user logged exercise!" }
                };
            }
            var result = await loggedStrengthExerciseRepository.DeleteAsync(loggedStrengthExercise.Value.LoggedStrengthExerciseId);
            if (!result.IsSuccess)
            {
                return new DeleteLoggedStrengthExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Error deleting logged strength exercise" }
                };
            }
            return new DeleteLoggedStrengthExerciseCommandResponse
            {
                Success = true
            };
        }
    }

}
