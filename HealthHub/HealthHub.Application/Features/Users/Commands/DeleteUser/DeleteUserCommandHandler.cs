using HealthHub.Application.Persistence;
using MediatR;

namespace HealthHub.Application.Features.Users.Commands.DeleteUser
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, DeleteUserCommandResponse>
    {
        private readonly IUserManager userManager;
        private readonly IMacronutrientsGoalRepository macronutrientsGoalRepository;
        private readonly IUserRepository userRepository;

        public DeleteUserCommandHandler(IUserManager userManager, IMacronutrientsGoalRepository macronutrientsGoalRepository, IUserRepository userRepository)
        {
            this.userManager = userManager;
            this.macronutrientsGoalRepository = macronutrientsGoalRepository;
            this.userRepository = userRepository;
        }

        public async Task<DeleteUserCommandResponse> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var result = await userManager.DeleteAsync(request.UserId);
            if (!result.IsSuccess)
                return new DeleteUserCommandResponse { Success = false, Message = result.Error };
            var userResult = await userRepository.FindByIdAsync(request.UserId);
            if (!userResult.IsSuccess)
                return new DeleteUserCommandResponse { Success = false, Message = userResult.Error };
            var deleteResult = await userRepository.DeleteAsync(request.UserId);
            if (!deleteResult.IsSuccess)
                return new DeleteUserCommandResponse { Success = false, Message = deleteResult.Error };
            var macronutrientsGoalResult = await macronutrientsGoalRepository.GetByUserIdAsync(request.UserId);
            if (!macronutrientsGoalResult.IsSuccess)
                return new DeleteUserCommandResponse { Success = false, Message = macronutrientsGoalResult.Error };
            var deleteMacronutrientsGoalResult = await macronutrientsGoalRepository.DeleteAsync(macronutrientsGoalResult.Value.MacronutrientsGoalId);
            if (!deleteMacronutrientsGoalResult.IsSuccess)
                return new DeleteUserCommandResponse { Success = false, Message = deleteMacronutrientsGoalResult.Error };
            return new DeleteUserCommandResponse { Success = true };
        }
    }
}
