using EC_API.Models;
using Microsoft.EntityFrameworkCore;

namespace EC_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<GlueIngredient> GlueIngredient { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }

        public DbSet<Glue> Glues { get; set; }
        public DbSet<Supplier> Supplier { get; set; }
        public DbSet<PartName> PartName { get; set; } // Kind
        public DbSet<PartName2> PartName2 { get; set; }// Part
        public DbSet<MaterialName> MaterialName { get; set; }
        public DbSet<Line> Line { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Stir> Stirs { get; set; }
        public DbSet<ModelName> ModelNames { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<PlanDetail> PlanDetails { get; set; }
        public DbSet<MapModel> MapModel { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<ArticleNo> ArticleNos { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<BuildingUser> BuildingUser { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Process> Processes { get; set; }
        public DbSet<ArtProcess> ArtProcesses { get; set; }
        public DbSet<ModelNo> ModelNos { get; set; }
        public DbSet<BPFCEstablish> BPFCEstablishes { get; set; }

        public DbSet<Kind> Kinds { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<MixingInfo> MixingInfos { get; set; }
        public DbSet<BuildingGlue> BuildingGlues { get; set; }
        public DbSet<IngredientInfo> IngredientsInfos { get; set; }
        public DbSet<IngredientInfoReport> IngredientInfoReports { get; set; }
        public DbSet<BPFCHistory> BPFCHistories { get; set; }
        public DbSet<Abnormal> Abnormals { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BPFCEstablish>().HasKey(x => x.ID);
        }

    }
}