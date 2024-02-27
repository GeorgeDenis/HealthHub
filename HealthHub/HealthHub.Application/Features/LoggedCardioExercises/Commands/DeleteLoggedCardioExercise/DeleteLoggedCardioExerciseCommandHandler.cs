using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.LoggedCardioExercises.Commands.DeleteLoggedCardioExercise
{
    public class DeleteLoggedCardioExerciseCommandHandler : IRequestHandler<DeleteLoggedCardioExerciseCommand, DeleteLoggedCardioExerciseCommandResponse>
    {
        private readonly ILoggedCardioExerciseRepository loggedCardioExerciseRepository;
        public DeleteLoggedCardioExerciseCommandHandler(ILoggedCardioExerciseRepository loggedCardioExerciseRepository)
        {
            this.loggedCardioExerciseRepository = loggedCardioExerciseRepository;
        }

        public async Task<DeleteLoggedCardioExerciseCommandResponse> Handle(DeleteLoggedCardioExerciseCommand request, CancellationToken cancellationToken)
        {
            var validator = new DeleteLoggedCardioExerciseCommandValidator();
            var validatorResult = await validator.ValidateAsync(request, cancellationToken);
            if(!validatorResult.IsValid)
            {
                return new DeleteLoggedCardioExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = validatorResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }
            var loggedCardioExercise = await loggedCardioExerciseRepository.FindByIdAsync(request.Id);
            if(request.UserId != loggedCardioExercise.Value.UserId)
            {
                return new DeleteLoggedCardioExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "You are not authorized to delete this logged cardio exercise." }
                };
            }
            var result = await loggedCardioExerciseRepository.DeleteAsync(request.Id);
            if (!result.IsSuccess)
            {
                return new DeleteLoggedCardioExerciseCommandResponse
                {
                    Success = false,
                    ValidationsErrors = new List<string> { "Something went wrong while deleting the logged cardio exercise." }
                };
            }
            return new DeleteLoggedCardioExerciseCommandResponse
            {
                Success = true,
            };

        }
    }
}
