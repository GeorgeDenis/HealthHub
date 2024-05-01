using HealthHub.Application.Features.EmailMessages.Queries.GetUserData;
using HealthHub.Application.Features.LoggedCardioExercises;
using HealthHub.Application.Features.LoggedMeasurementsEntries;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface ILoggedMeasurementsRepository : IAsyncRepository<LoggedMeasurements>
    {
        Task<Result<LoggedMeasurementsDto>> GetLoggedMeasurementsByUserIdAndDate(Guid userId);
        Task<Result<LoggedMeasurementsDto>> GetLoggedMeasurementsByUserIdAndDate(Guid userId, DateTime date);
        Task<Result<List<LoggedMeasurementsDto>>> GetLoggedMeasurementsByUserId(Guid userId);
        Task<Result<List<LoggedMeasurementsDto>>> GetByUserIdAndDateInterval(Guid userId, DateRange dateRange);
        Task<int> GetLoggedConsecutiveWeeks(Guid userId);

    }
}
