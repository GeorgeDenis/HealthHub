using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class LoggedMeasurements
    {
        private LoggedMeasurements(Guid UserId, float? Weight, float? WaistCircumference, float? HipCircumference, float? NeckCircumference, string? WeightPhotoUrl)
        {
            this.UserId = UserId;
            this.DateLogged = DateTime.UtcNow;
            this.Weight = Weight;
            this.WaistCircumference = WaistCircumference;
            this.HipCircumference = HipCircumference;
            this.NeckCircumference = NeckCircumference;
            this.WeightPhotoUrl = WeightPhotoUrl;
        }
        public LoggedMeasurements()
        {
        }
        public Guid LoggedMeasurementsId { get; private set; }
        public Guid UserId { get; private set; }
        public DateTime DateLogged { get; private set; }
        public float? Weight { get; private set; }
        public float? WaistCircumference { get; private set; }
        public float? HipCircumference { get; private set; }
        public float? NeckCircumference { get; private set; }
        public string? WeightPhotoUrl { get; set; }

        public static Result<LoggedMeasurements> Create(Guid UserId, float? Weight, float? WaistCircumference, float? HipCircumference, float? NeckCircumference, string? WeightPhotoUrl)
        {
            if (UserId == Guid.Empty)
            {
                return Result<LoggedMeasurements>.Failure("UserId cannot be empty");
            }
            if (Weight.HasValue && Weight <= 0)
            {
                return Result<LoggedMeasurements>.Failure("Weight must be greater than 0 when provided.");
            }
            if (WaistCircumference.HasValue && WaistCircumference <= 0)
            {
                return Result<LoggedMeasurements>.Failure("Waist circumference must be greater than 0 when provided.");
            }
            if (HipCircumference.HasValue && HipCircumference <= 0)
            {
                return Result<LoggedMeasurements>.Failure("Hip circumference must be greater than 0 when provided.");
            }
            if (NeckCircumference.HasValue && NeckCircumference <= 0)
            {
                return Result<LoggedMeasurements>.Failure("Neck circumference must be greater than 0 when provided.");
            }
            if (WeightPhotoUrl != null && WeightPhotoUrl.Length > 2000)
            {
                return Result<LoggedMeasurements>.Failure("Weight photo url cannot be longer than 2000 characters.");
            }

            return Result<LoggedMeasurements>.Success(new LoggedMeasurements(UserId, Weight, WaistCircumference, HipCircumference, NeckCircumference, WeightPhotoUrl));

        }
        public Result<LoggedMeasurements> Update(float? Weight, float? WaistCircumference, float? HipCircumference, float? NeckCircumference, string? WeightPhotoUrl)
        {
            if (Weight.HasValue && Weight <= 0)
            {
                return Result<LoggedMeasurements>.Failure("Weight must be greater than 0 when provided.");
            }
            if (WaistCircumference.HasValue && WaistCircumference <= 0)
            {
                return Result<LoggedMeasurements>.Failure("Waist circumference must be greater than 0 when provided.");
            }
            if (HipCircumference.HasValue && HipCircumference <= 0)
            {
                return Result<LoggedMeasurements>.Failure("Hip circumference must be greater than 0 when provided.");
            }
            if (NeckCircumference.HasValue && NeckCircumference <= 0)
            {
                return Result<LoggedMeasurements>.Failure("Neck circumference must be greater than 0 when provided.");
            }
            if (WeightPhotoUrl != null && WeightPhotoUrl.Length > 2000)
            {
                return Result<LoggedMeasurements>.Failure("Weight photo url cannot be longer than 2000 characters.");
            }
            this.Weight = Weight;
            this.WaistCircumference = WaistCircumference;
            this.HipCircumference = HipCircumference;
            this.NeckCircumference = NeckCircumference;
            this.WeightPhotoUrl = WeightPhotoUrl;
            return Result<LoggedMeasurements>.Success(this);
        }
        public Result<LoggedMeasurements> DeletePhoto()
        {
            this.WeightPhotoUrl = null;
            return Result<LoggedMeasurements>.Success(this);
        }


    }
}
