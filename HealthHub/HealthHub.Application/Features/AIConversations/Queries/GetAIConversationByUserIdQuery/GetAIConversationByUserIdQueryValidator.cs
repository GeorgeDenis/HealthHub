using FluentValidation;

namespace HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByUserIdQuery
{
    public class GetAIConversationByUserIdQueryValidator : AbstractValidator<GetAIConversationByUserIdQuery>
    {
        public GetAIConversationByUserIdQueryValidator()
        {
            RuleFor(p => p.UserId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }

}
