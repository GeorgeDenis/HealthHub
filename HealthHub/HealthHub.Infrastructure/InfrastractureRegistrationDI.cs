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
                    ("ErgoConnection"),
                    builder =>
                    builder.MigrationsAssembly(
                        typeof(HealthHubContext)
                        .Assembly.FullName)));
            return services;
        }
    }
}
