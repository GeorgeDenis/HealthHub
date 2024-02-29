using HealthHub.Application.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthHub.Application.Features.LoggedWeights.Queries.GetLastLoggedWeightByUserId
{
    public class GetLastLoggedWeightByUserIdQueryHandler : IRequestHandler<GetLastLoggedWeightByUserIdQuery, GetLastLoggedWeightByUserIdQueryResponse>
    {
        private readonly ILoggedWeightRepository loggedWeightRepository;
        public GetLastLoggedWeightByUserIdQueryHandler(ILoggedWeightRepository loggedWeightRepository)
        {
            this.loggedWeightRepository = loggedWeightRepository;
        }
        public async Task<GetLastLoggedWeightByUserIdQueryResponse> Handle(GetLastLoggedWeightByUserIdQuery request, CancellationToken cancellationToken)
        {
            var validator = new GetLastLoggedWeightByUserIdQueryValidator();
            var validatorResult = await validator.ValidateAsync(request);
            if (!validatorResult.IsValid)
            {
                return new GetLastLoggedWeightByUserIdQueryResponse()
                { 
                    Success = false, 
                    ValidationsErrors = validatorResult.Errors.Select(x => x.ErrorMessage).ToList()
                };
            }
            var loggedWeight = await loggedWeightRepository.GetLastLoggedWeightByUserId(request.UserId);
            if (!loggedWeight.IsSuccess)
            {
                return new GetLastLoggedWeightByUserIdQueryResponse()
                {
                    Success = false,
                    Message = "Error retrieving last logged weight"
                };
            }
            return new GetLastLoggedWeightByUserIdQueryResponse()
            {
                Success = true,
                Weight = loggedWeight.Value.Weight,
                DateLogged = loggedWeight.Value.DateLogged
            };
        }
    }
}
