using FluentValidation;

namespace HealthHub.Application.Features.AIChats.Queries.GetAIChatByConversationIdQuery
{
    public class GetAIChatByConversationIdQueryValidator : AbstractValidator<GetAIChatByConversationIdQuery>
    {
        public GetAIChatByConversationIdQueryValidator()
        {
            RuleFor(p => p.AIConversationId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}
