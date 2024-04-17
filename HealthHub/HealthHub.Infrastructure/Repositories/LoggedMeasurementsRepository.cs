﻿using HealthHub.Application.Features.EmailMessages.Queries.GetUserData;
using HealthHub.Application.Features.LoggedMeasurementsEntries;
using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HealthHub.Infrastructure.Repositories
{
    public class LoggedMeasurementsRepository : BaseRepository<LoggedMeasurements>, ILoggedMeasurementsRepository
    {
        public LoggedMeasurementsRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<Result<List<LoggedMeasurementsDto>>> GetLoggedMeasurementsByUserId(Guid userId)
        {
            var loggedMeasurements = context.LoggedMeasurements.Where(x => x.UserId == userId).Select(x => new LoggedMeasurementsDto
            {
                Id = x.LoggedMeasurementsId,
                UserId = x.UserId,
                DateLogged = x.DateLogged,
                Weight = x.Weight,
                WaistCircumference = x.WaistCircumference,
                HipCircumference = x.HipCircumference,
                NeckCircumference = x.NeckCircumference,
                WeightPhotoUrl = x.WeightPhotoUrl
            }).ToList();
            return Result<List<LoggedMeasurementsDto>>.Success(loggedMeasurements);

        }

        public async Task<Result<LoggedMeasurementsDto>> GetLoggedMeasurementsByUserIdAndDate(Guid userId)
        {
            DateTime date = DateTime.UtcNow;
            var dayStart = date.Date;
            var dayEnd = dayStart.AddDays(1);
            var loggedMeasurements = context.LoggedMeasurements.Where(x => x.UserId == userId && x.DateLogged >= dayStart && x.DateLogged < dayEnd).Select(x => new LoggedMeasurementsDto
            {
                Id = x.LoggedMeasurementsId,
                UserId = x.UserId,
                DateLogged = x.DateLogged,
                Weight = x.Weight,
                WaistCircumference = x.WaistCircumference,
                HipCircumference = x.HipCircumference,
                NeckCircumference = x.NeckCircumference,
                WeightPhotoUrl = x.WeightPhotoUrl
            }).FirstOrDefault();
            if (loggedMeasurements == null)
            {
                return Result<LoggedMeasurementsDto>.Failure("No logged measurements found for this user on this date");
            }

            return Result<LoggedMeasurementsDto>.Success(loggedMeasurements);
        }

        public async Task<Result<LoggedMeasurementsDto>> GetLoggedMeasurementsByUserIdAndDate(Guid userId, DateTime date)
        {
            var dayStart = date.Date;
            var dayEnd = dayStart.AddDays(1);
            var loggedMeasurements = context.LoggedMeasurements.Where(x => x.UserId == userId && x.DateLogged >= dayStart && x.DateLogged < dayEnd).Select(x => new LoggedMeasurementsDto
            {
                Id = x.LoggedMeasurementsId,
                UserId = x.UserId,
                DateLogged = x.DateLogged,
                Weight = x.Weight,
                WaistCircumference = x.WaistCircumference,
                HipCircumference = x.HipCircumference,
                NeckCircumference = x.NeckCircumference,
                WeightPhotoUrl = x.WeightPhotoUrl
            }).FirstOrDefault();
            return Result<LoggedMeasurementsDto>.Success(loggedMeasurements);

        }
        public async Task<Result<List<LoggedMeasurementsDto>>> GetByUserIdAndDateInterval(Guid userId, DateRange dateRange)
        {
            var fromDate = GetFromDate(dateRange);
            var toDate = DateTime.UtcNow;
            var loggedMeasurements = context.LoggedMeasurements
                .Where(x => x.UserId == userId && x.DateLogged >= fromDate && x.DateLogged <= toDate)
                .OrderByDescending(x => x.DateLogged)
                .Select(x => new LoggedMeasurementsDto
                {
                    Id = x.LoggedMeasurementsId,
                    UserId = x.UserId,
                    DateLogged = x.DateLogged,
                    Weight = x.Weight,
                    WaistCircumference = x.WaistCircumference,
                    HipCircumference = x.HipCircumference,
                    NeckCircumference = x.NeckCircumference,
                    WeightPhotoUrl = x.WeightPhotoUrl
                })
                .ToList();
            return Result<List<LoggedMeasurementsDto>>.Success(loggedMeasurements);

        }
        private DateTime GetFromDate(DateRange range)
        {
            switch (range)
            {
                case DateRange.Last7Days:
                    return DateTime.UtcNow.AddDays(-7);
                case DateRange.Last90Days:
                    return DateTime.UtcNow.AddDays(-90);
                case DateRange.Last180Days:
                    return DateTime.UtcNow.AddDays(-180);
                case DateRange.LastYear:
                    return DateTime.UtcNow.AddYears(-1);
                default:
                    throw new ArgumentOutOfRangeException(nameof(range), range, null);
            }
        }
    }

}
