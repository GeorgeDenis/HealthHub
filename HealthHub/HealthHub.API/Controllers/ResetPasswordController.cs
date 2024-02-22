using HealthHub.Application.Features.ResetCode.Commands.CreateResetCode;
using HealthHub.Application.Features.ResetCode.Queries.VerifyResetCode;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{

    public class ResetPasswordController : ApiControllerBase
    {
        [HttpPost]
        [Route("reset-code")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> ResetCode(CreateResetCodeCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);

        }
        [HttpPost]
        [Route("verify-reset-code")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> VerifyResetCode(VerifyResetCodeQuery query)
        {
            var result = await Mediator.Send(query);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);

        }
    }
}
