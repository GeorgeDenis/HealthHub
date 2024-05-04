using HealthHub.Application.Contracts.Interfaces;
using HealthHub.Application.Persistence;
using HealthHub.Infrastructure.Repositories;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HealthHub.Infrastructure
{
    public static class InfrastructureRegistrationDI
    {
        public static IServiceCollection AddInfrastructureToDI(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<HealthHubContext>(
                options =>
                options.UseNpgsql(
                    configuration.GetConnectionString
                    ("HealthHubConnection"),
                    builder =>
                    builder.MigrationsAssembly(
                        typeof(HealthHubContext)
                        .Assembly.FullName)));
            services.AddScoped
                (typeof(IAsyncRepository<>),
                typeof(BaseRepository<>));
            services.AddScoped<
                IUserRepository, UserRepository>();
            services.AddScoped<IPasswordResetCodeRepository, PasswordResetCodeRepository>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IMacronutrientsGoalRepository, MacronutrientsGoalRepository>();
            services.AddScoped<ILoggedWeightRepository, LoggedWeightRepository>();
            services.AddScoped<ILoggedFoodRepository, LoggedFoodRepository>();
            services.AddScoped<ILoggedWaterRepository, LoggedWaterRepository>();
            services.AddScoped<ILoggedMeasurementsRepository, LoggedMeasurementsRepository>();
            services.AddScoped<ILoggedStrengthExerciseRepository, LoggedStrengthExerciseRepository>();
            services.AddScoped<ILoggedCardioExerciseRepository, LoggedCardioExerciseRepository>();
            services.AddScoped<IRecipeCommentRepository, RecipeCommentRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IBadgeRepository, BadgeRepository>();
            services.AddScoped<IUserVotedBadgesRepository, UserVotedBadgesRepository>();
            return services;
        }
    }
}
