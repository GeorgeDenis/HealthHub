using FluentValidation;

namespace HealthHub.Application.Features.AIConversations.Queries.GetAIConversationByIdQuery
{
    public class GetAIConversationByIdQueryValidator : AbstractValidator<GetAIConversationByIdQuery>
    {
        public GetAIConversationByIdQueryValidator()
        {
            RuleFor(p => p.Id)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
   
}
