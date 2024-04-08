using HealthHub.Application.Features.RecipeComments.Commands.CreateRecipeComment;
using HealthHub.Application.Features.RecipeComments.Commands.DeleteRecipeComment;
using HealthHub.Application.Features.RecipeComments.Commands.UpdateRecipeComment;
using HealthHub.Application.Features.RecipeComments.Queries.GetRecipeCommentsByRecipeId;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{
    public class RecipeCommentController : ApiControllerBase
    {
        [Authorize(Roles = "User")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateRecipeComment([FromBody] CreateRecipeCommentCommand command)
        {
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Created("RecipeComment", result);
        }

        [Authorize(Roles = "User")]
        [HttpGet]
        [Route("{recipeId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetRecipeCommentsByRecipeId(string recipeId)
        {
            var result = await Mediator.Send(new GetRecipeCommentsByRecipeIdQuery { RecipeId = recipeId });
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpPut]
        [Route("{commentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateRecipeComment(Guid commentId, [FromBody] UpdateRecipeCommentCommand command)
        {
            command.Id = commentId;
            var result = await Mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
        [Authorize(Roles = "User")]
        [HttpDelete]
        [Route("{commentId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteRecipeComment(Guid commentId, Guid userId)
        {
            var result = await Mediator.Send(new DeleteRecipeCommentCommand { CommentId = commentId, UserId = userId });
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return NoContent();
        }
    }
}
