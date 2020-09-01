using EC_API.Models;
using Microsoft.EntityFrameworkCore;

namespace EC_API.Data
{
    public class IoTContext : DbContext
    {
        public IoTContext(DbContextOptions<IoTContext> options) : base(options) { }
        public DbSet<Mixing> Mixing { get; set; }
      

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Mixing>().HasKey(x => x.ID);// um
        }

    }
}