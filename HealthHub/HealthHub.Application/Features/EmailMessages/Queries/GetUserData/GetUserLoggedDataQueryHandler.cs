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
            var measurements = await loggedMeasurementsRepository.GetByUserIdAndDateInterval(request.UserId,request.DateRange);
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


            await emailService.SendEmailWithAttachmentAsync(
                user.Value.Email,
                "Your Logged Data",
                "Please find attached the ZIP archive with your logged data.",
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
    }

}

