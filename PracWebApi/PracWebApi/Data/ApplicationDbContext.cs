using Microsoft.EntityFrameworkCore;

namespace PracWebApi.Data
{
    public class ApplicationDbContext:DbContext
    {
       public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<WeatherForecast> WeatherForecasts { get; set; }
    }
}
