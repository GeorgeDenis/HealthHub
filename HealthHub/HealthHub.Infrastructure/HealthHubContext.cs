using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure
{
    public class HealthHubContext : DbContext
    {
        public HealthHubContext(DbContextOptions<HealthHubContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }

    }
}
