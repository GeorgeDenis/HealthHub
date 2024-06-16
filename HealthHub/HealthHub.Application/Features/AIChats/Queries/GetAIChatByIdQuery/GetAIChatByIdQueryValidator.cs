using FluentValidation;

namespace HealthHub.Application.Features.AIChats.Queries.GetAIChatByIdQuery
{
    public class GetAIChatByIdQueryValidator : AbstractValidator<GetAIChatByIdQuery>
    {
        public GetAIChatByIdQueryValidator()
        {
            RuleFor(p => p.Id)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
