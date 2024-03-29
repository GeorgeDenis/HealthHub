using HealthHub.API.Models;
using HealthHub.API.Models.AwsS3;
using HealthHub.API.Services;
using HealthHub.Application.Features.LoggedMeasurementsEntries.Commands.UpdateLoggedMeasurements;
using HealthHub.Application.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CloudController : ApiControllerBase
    {
        private readonly IStorageService storageService;
        private string AwsKeyEnv { get; set; }
        private string AwsSecretKeyEnv { get; set; }

        public CloudController(IStorageService storageService)
        {

            this.storageService = storageService;
            AwsKeyEnv = DotNetEnv.Env.GetString("AWSAccessKey");
            AwsSecretKeyEnv = DotNetEnv.Env.GetString("AWSSecretKey");
        }
        [Authorize(Roles = "User")]
        [HttpPost]
        [Route("upload-measurements-photo")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> UploadFile(AddMeasurementPhotoDto addPhoto)
        {
            await using var memoryStr = new MemoryStream();
            await addPhoto.File.CopyToAsync(memoryStr);

            var fileExt = Path.GetExtension(addPhoto.File.FileName);
            var objName = $"{Guid.NewGuid()}{fileExt}";
            var s3Object = new S3Object()
            {
                BucketName = "ergo-project",
                InputStream = memoryStr,
                Name = objName
            };

            var cred = new AWSCredential()
            {
                AwsKey = AwsKeyEnv,
                AwsSecretKey = AwsSecretKeyEnv
            };
            var result = await storageService.UploadFileAsync(s3Object, cred);
            var command = new UpdateLoggedMeasurementsCommand()
            {
                WeightPhotoUrl = objName,
                Id = addPhoto.LoggedMeasurementsId,
                UserId = addPhoto.UserId
            };
            var photoResult = await Mediator.Send(command);
            if (!photoResult.Success)
            {
                await storageService.DeleteFileAsync(objName, cred);
                return BadRequest(photoResult);
            }
            return Ok();
        }
    }
}
