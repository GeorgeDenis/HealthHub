using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthHub.Application.Features.MacronutrientsGoal.Queries.GetByUserId
{
    public class GetMacronutrientsByUserIdQuery : IRequest<GetMacronutrientsByUserIdQueryResponse>
    {
        public Guid UserId { get; set; }
    }
}
