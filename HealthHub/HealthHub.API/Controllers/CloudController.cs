using HealthHub.API.Models;
using HealthHub.API.Models.AwsS3;
using HealthHub.API.Services;
using HealthHub.Application.Features.LoggedMeasurementsEntries.Commands.UpdateLoggedMeasurements;
using HealthHub.Application.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace HealthHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CloudController : ApiControllerBase
    {
        private readonly IStorageService storageService;
        private readonly ILoggedMeasurementsRepository loggedMeasurementsRepository;
        private string AwsKeyEnv { get; set; }
        private string AwsSecretKeyEnv { get; set; }

        public CloudController(IStorageService storageService, ILoggedMeasurementsRepository loggedMeasurementsRepository)
        {

            this.storageService = storageService;
            AwsKeyEnv = DotNetEnv.Env.GetString("AWSAccessKey");
            AwsSecretKeyEnv = DotNetEnv.Env.GetString("AWSSecretKey");
            this.loggedMeasurementsRepository = loggedMeasurementsRepository;
        }
        [Authorize(Roles = "User")]
        [HttpPost]
        [Route("measurements-photo")]
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
            var loggedMeasurements = await loggedMeasurementsRepository.FindByIdAsync(addPhoto.LoggedMeasurementsId);
            if (loggedMeasurements.IsSuccess)
            {
                if (!string.IsNullOrEmpty(loggedMeasurements.Value.WeightPhotoUrl))
                {
                    await storageService.DeleteFileAsync(loggedMeasurements.Value.WeightPhotoUrl, cred);
                }
            }
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
        [Authorize(Roles = "User")]
        [HttpDelete]
        [Route("measurements-photo")]
        public async Task<IActionResult> DeleteFile(DeleteMeasurementPhotoDto request)
        {
            var loggedMeasurements = await loggedMeasurementsRepository.FindByIdAsync(request.LoggedMeasurementsId);
            if (!loggedMeasurements.IsSuccess)
            {
                return BadRequest("There's no photo for this entry!");
            }
            else
            {
                var cred = new AWSCredential()
                {
                    AwsKey = AwsKeyEnv,
                    AwsSecretKey = AwsSecretKeyEnv
                };
                if (loggedMeasurements.Value.WeightPhotoUrl != null)
                {

                    var result = await storageService.DeleteFileAsync(loggedMeasurements.Value.WeightPhotoUrl, cred);
                    if (!result)
                    {
                        return BadRequest(result);
                    }
                    var photoResult = loggedMeasurements.Value.DeletePhoto();
                    if (!photoResult.IsSuccess)
                    {
                        return BadRequest(photoResult.Error);
                    }
                    var updateResult = await loggedMeasurementsRepository.UpdateAsync(loggedMeasurements.Value);
                    if (!updateResult.IsSuccess)
                    {
                        return BadRequest(updateResult.Error);
                    }

                }
                return Ok();
            }

        }
    }
}
