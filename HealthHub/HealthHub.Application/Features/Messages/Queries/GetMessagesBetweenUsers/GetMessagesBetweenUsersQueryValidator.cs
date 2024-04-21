using FluentValidation;

namespace HealthHub.Application.Features.Messages.Queries.GetMessagesBetweenUsers
{
    public class GetMessagesBetweenUsersQueryValidator : AbstractValidator<GetMessagesBetweenUsersQuery>
    {
        public GetMessagesBetweenUsersQueryValidator()
        {
            RuleFor(p => p.User1)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(p => p.User2)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
