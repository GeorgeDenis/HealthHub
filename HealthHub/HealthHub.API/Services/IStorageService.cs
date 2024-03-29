using HealthHub.API.Models.AwsS3;

namespace HealthHub.API.Services
{
    public interface IStorageService
    {
        Task<S3ResponseDto> UploadFileAsync(S3Object s3Object, AWSCredential aWSCredentials);
        Task<bool> DeleteFileAsync(string objectName, AWSCredential aWSCredentials);

    }
}
