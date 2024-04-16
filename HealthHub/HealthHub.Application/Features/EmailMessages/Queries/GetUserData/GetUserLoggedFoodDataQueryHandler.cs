using CsvHelper;
using HealthHub.Application.Contracts.Interfaces;
using HealthHub.Application.Features.LoggedCardioExercises;
using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using HealthHub.Application.Persistence;
using MediatR;
using MimeKit;
using System.Globalization;
using System.Text;

namespace HealthHub.Application.Features.EmailMessages.Queries.GetUserData
{
    public class GetUserLoggedFoodDataQueryHandler : IRequestHandler<GetUserLoggedFoodDataQuery, GetUserLoggedFoodDataQueryResponse>
    {
        private readonly ILoggedFoodRepository loggedFoodRepository;
        private readonly ILoggedCardioExerciseRepository loggedCardioExerciseRepository;
        private readonly IEmailService emailService;

        private readonly IUserManager userManager;
        public GetUserLoggedFoodDataQueryHandler(IUserManager userManager, ILoggedFoodRepository loggedFoodRepository, IEmailService emailService, ILoggedCardioExerciseRepository loggedCardioExerciseRepository)
        {
            this.userManager = userManager;
            this.loggedFoodRepository = loggedFoodRepository;
            this.emailService = emailService;
            this.loggedCardioExerciseRepository = loggedCardioExerciseRepository;
        }
        public async Task<GetUserLoggedFoodDataQueryResponse> Handle(GetUserLoggedFoodDataQuery request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByIdAsync(request.UserId);
            if (!user.IsSuccess)
            {
                return new GetUserLoggedFoodDataQueryResponse { Success = false, Message = "User not found" };
            }
            var loggedFood = await loggedFoodRepository.GetByUserIdAndDateAsync(request.UserId, DateTime.UtcNow);
            if (!loggedFood.IsSuccess)
            {
                return new GetUserLoggedFoodDataQueryResponse { Success = false, Message = "No logged food found" };
            }
            var response = new GetUserLoggedFoodDataQueryResponse();
            var foodList = loggedFood.Value.ToList();

            foreach (var food in foodList)
            {
                response.LoggedFoods.Add(new LoggedFoodDto
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
            var cardioExercises = await loggedCardioExerciseRepository.GetByUserIdAndDateAsync(request.UserId, DateTime.UtcNow);
            var loggedCardioExercise = new List<LoggedCardioExerciseDto>();
            foreach (var cardioExercise in cardioExercises.Value)
            {
                loggedCardioExercise.Add(new LoggedCardioExerciseDto
                {
                    LoggedCardioExerciseId = cardioExercise.LoggedCardioExerciseId,
                    UserId = cardioExercise.UserId,
                    Name = cardioExercise.Name,
                    Duration = cardioExercise.Duration,
                    CaloriesBurned = cardioExercise.CaloriesBurned,
                    DateLogged = cardioExercise.DateLogged
                });
            }
            response.Success = true;
            using var memoryStream = new MemoryStream();
            using (var streamWriter = new StreamWriter(memoryStream, new UTF8Encoding(true), 1024, true))
            using (var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture))
            {
                csvWriter.WriteRecords(loggedFood.Value);
                streamWriter.Flush();
            }

            memoryStream.Seek(0, SeekOrigin.Begin);


            // Send the email with the attachment
            await emailService.SendEmailWithAttachmentAsync(
                user.Value.Email,
                "Your Logged Food Data",
                "Please find attached the CSV file with your logged food data.",
                memoryStream,
                $"logged-foods-{user.Value.UserId}.csv"
            );

            //            using var foodStream = new MemoryStream();
            //            using (var streamWriter = new StreamWriter(foodStream, new UTF8Encoding(true), 1024, true))
            //            using (var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture))
            //            {
            //                csvWriter.WriteRecords(loggedFood.Value);
            //                streamWriter.Flush();
            //            }
            //            foodStream.Seek(0, SeekOrigin.Begin);

            //            // Second CSV for cardio exercises
            //            using var cardioStream = new MemoryStream();
            //            using (var streamWriter = new StreamWriter(cardioStream, new UTF8Encoding(true), 1024, true))
            //            using (var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture))
            //            {
            //                csvWriter.WriteRecords(loggedCardioExercise);
            //                streamWriter.Flush();
            //            }
            //            cardioStream.Seek(0, SeekOrigin.Begin);
            //            var attachments = new List<(MemoryStream, string)>
            //{
            //    (foodStream, $"logged-foods-{user.Value.UserId}.csv"),
            //    (cardioStream, $"logged-cardio-{user.Value.UserId}.csv")
            //};

            //            // Send the email with the attachments
            //            await emailService.SendEmailWithMultipleAttachmentsAsync(
            //                user.Value.Email,
            //                "Your Logged Food and Cardio Data",
            //                "Please find attached the CSV files with your logged food and cardio data.",
            //                attachments
            //            );

            return response;

        }
    }
}
