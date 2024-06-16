using CsvHelper;
using HealthHub.Application.Contracts.Interfaces;
using HealthHub.Application.Features.LoggedCardioExercises;
using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using HealthHub.Application.Features.LoggedMeasurementsEntries;
using HealthHub.Application.Features.LoggedStrengthExercises;
using HealthHub.Application.Persistence;
using MediatR;
using System.Globalization;
using System.IO.Compression;
using System.Text;

namespace HealthHub.Application.Features.EmailMessages.Queries.GetUserData
{
    public class GetUserLoggedDataQueryHandler : IRequestHandler<GetUserLoggedDataQuery, GetUserLoggedDataQueryResponse>
    {
        private readonly ILoggedFoodRepository loggedFoodRepository;
        private readonly ILoggedCardioExerciseRepository loggedCardioExerciseRepository;
        private readonly ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository;
        private readonly ILoggedMeasurementsRepository loggedMeasurementsRepository;
        private readonly IEmailService emailService;

        private readonly IUserManager userManager;
        public GetUserLoggedDataQueryHandler(IUserManager userManager, ILoggedFoodRepository loggedFoodRepository, IEmailService emailService, ILoggedCardioExerciseRepository loggedCardioExerciseRepository, ILoggedStrengthExerciseRepository loggedStrengthExerciseRepository, ILoggedMeasurementsRepository loggedMeasurementsRepository)
        {
            this.userManager = userManager;
            this.loggedFoodRepository = loggedFoodRepository;
            this.emailService = emailService;
            this.loggedCardioExerciseRepository = loggedCardioExerciseRepository;
            this.loggedStrengthExerciseRepository = loggedStrengthExerciseRepository;
            this.loggedMeasurementsRepository = loggedMeasurementsRepository;
        }
        public async Task<GetUserLoggedDataQueryResponse> Handle(GetUserLoggedDataQuery request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByIdAsync(request.UserId);
            if (!user.IsSuccess)
            {
                return new GetUserLoggedDataQueryResponse { Success = false, Message = "User not found" };
            }
            var foodList = await loggedFoodRepository.GetByUserIdAndDateInterval(request.UserId, request.DateRange);
            if (!foodList.IsSuccess)
            {
                return new GetUserLoggedDataQueryResponse { Success = false, Message = "No logged food found" };
            }
            var response = new GetUserLoggedDataQueryResponse();
            var loggedFood = new List<LoggedFoodExportDto>();

            foreach (var food in foodList.Value)
            {
                loggedFood.Add(new LoggedFoodExportDto
                {
                    FoodName = food.FoodName,
                    ServingSize = food.ServingSize,
                    NumberOfServings = food.NumberOfServings,
                    Calories = food.Calories,
                    Protein = food.Protein,
                    Carbohydrates = food.Carbohydrates,
                    Fat = food.Fat,
                    MealType = food.MealType,
                    DateLogged = food.DateLogged
                });
            }
            var cardioExercises = await loggedCardioExerciseRepository.GetByUserIdAndDateInterval(request.UserId, request.DateRange);
            var loggedCardioExercise = new List<LoggedCardioExerciseExportDto>();
            foreach (var cardioExercise in cardioExercises.Value)
            {
                loggedCardioExercise.Add(new LoggedCardioExerciseExportDto
                {
                    Name = cardioExercise.Name,
                    Duration = cardioExercise.Duration,
                    CaloriesBurned = cardioExercise.CaloriesBurned,
                    DateLogged = cardioExercise.DateLogged
                });
            }
            var strengthExercises = await loggedStrengthExerciseRepository.GetByUserIdAndDateInterval(request.UserId, request.DateRange);
            var loggedStrengthExercise = new List<LoggedStrengthExerciseExportDto>();
            foreach (var strengthExercise in strengthExercises.Value)
            {
                loggedStrengthExercise.Add(new LoggedStrengthExerciseExportDto
                {
                    Name = strengthExercise.Name,
                    MuscleGroup = strengthExercise.MuscleGroup,
                    NumberOfSets = strengthExercise.NumberOfSets,
                    WeightPerSet = strengthExercise.WeightPerSet,
                    DateLogged = strengthExercise.DateLogged
                });
            }
            var measurements = await loggedMeasurementsRepository.GetByUserIdAndDateInterval(request.UserId, request.DateRange);
            var loggedMeasurements = new List<LoggedMeasurementsExportDto>();
            foreach (var measurement in measurements.Value)
            {
                loggedMeasurements.Add(new LoggedMeasurementsExportDto
                {
                    Weight = measurement.Weight,
                    NeckCircumference = measurement.NeckCircumference,
                    WaistCircumference = measurement.WaistCircumference,
                    HipCircumference = measurement.HipCircumference,
                    DateLogged = measurement.DateLogged
                });
            }
            response.Success = true;

            using var foodStream = new MemoryStream();
            WriteCsv(foodStream, loggedFood);
            foodStream.Seek(0, SeekOrigin.Begin);

            using var cardioStream = new MemoryStream();
            WriteCsv(cardioStream, loggedCardioExercise);
            cardioStream.Seek(0, SeekOrigin.Begin);

            using var strengthStream = new MemoryStream();
            WriteCsv(strengthStream, loggedStrengthExercise);
            strengthStream.Seek(0, SeekOrigin.Begin);

            using var measurementsStream = new MemoryStream();
            WriteCsv(measurementsStream, loggedMeasurements);
            measurementsStream.Seek(0, SeekOrigin.Begin);

            using var zipStream = new MemoryStream();
            using (var archive = new ZipArchive(zipStream, ZipArchiveMode.Create, true))
            {
                AddCsvToArchive(archive, foodStream, $"logged-foods.csv");
                AddCsvToArchive(archive, cardioStream, $"logged-cardio.csv");
                AddCsvToArchive(archive, strengthStream, $"logged-strength.csv");
                AddCsvToArchive(archive, measurementsStream, $"logged-measurements.csv");
            }

            zipStream.Position = 0;

            var days = GetDays(request.DateRange);


            string emailBody = $@"
<html>
<body>
<p>Dear {user.Value.Name},</p>

<p>We hope this message finds you well.</p>

<p>As requested, please find attached a ZIP archive containing your logged data for the {days}. We are committed to helping you track and achieve your fitness and health goals, and we hope this data will be valuable in your journey.</p>

<p>If you have any questions or need further assistance, feel free to reach out to our support team.</p>

<p>Stay healthy and keep pushing towards your goals!</p>

<p>Best regards,<br />
The HealthHub Team</p>
</body>
</html>";

            await emailService.SendEmailWithAttachmentAsync(
                user.Value.Email,
                "Your Logged Data",
                emailBody,
                zipStream,
                "logged-data.zip"
            );


            return response;

        }
        public static void WriteCsv<T>(Stream stream, List<T> data) where T : class
        {
            using (var streamWriter = new StreamWriter(stream, new UTF8Encoding(true), 1024, true))
            using (var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture))
            {
                csvWriter.WriteRecords(data);
                streamWriter.Flush();
            }
        }
        public static void AddCsvToArchive(ZipArchive archive, MemoryStream csvStream, string fileName)
        {
            csvStream.Position = 0;
            var zipEntry = archive.CreateEntry(fileName);
            using (var entryStream = zipEntry.Open())
            {
                csvStream.CopyTo(entryStream);
            }
        }
        public static string GetDays(DateRange dateRange)
        {
            switch (dateRange)
            {
                case DateRange.Last7Days:
                    return "last 7 days";
                case DateRange.Last90Days:
                    return "last 90 days";
                case DateRange.Last180Days:
                    return "last 180 days";
                case DateRange.LastYear:
                    return "last year";
                default:
                    return "last 7 days";
            }
        }
    }

}

