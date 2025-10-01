using Microsoft.EntityFrameworkCore;

namespace PeopleCrudApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Pessoa> Pessoas => Set<Pessoa>();
    }
}
