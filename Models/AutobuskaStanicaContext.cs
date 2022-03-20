using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class AutobuskaStanicaContext:DbContext
    {
       
        public DbSet<Odrediste> Odredista{get;set;}
        public DbSet<Voznja> Voznje{get;set;}
        public DbSet<AutobuskaStanica> Stanice{get;set;}
        public DbSet<Autobus> Autobusi{get;set;}
        public AutobuskaStanicaContext(DbContextOptions options):base(options)
        {

        }

    }
}
