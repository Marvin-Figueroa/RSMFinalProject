using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RSMFinalProject.Server.DTOs;

namespace RSMFinalProject.Server.Data;

public partial class AdventureWorks2022Context : DbContext
{
    public AdventureWorks2022Context()
    {
    }

    public AdventureWorks2022Context(DbContextOptions<AdventureWorks2022Context> options)
        : base(options)
    {
    }

    public DbSet<SalesPerformanceDTO> SalesPerformance { get; set; }
    public DbSet<SalesOrderDetailsDTO> SalesDetails { get; set; }
    public virtual IEnumerable<SalesPerformanceDTO> GetSalesPerformance(string category, string product, string region)
    {
        var parameters = new List<SqlParameter>
    {
        new SqlParameter("@ProductCategoryName", category != null ? category : DBNull.Value),
        new SqlParameter("@ProductName", product != null ? product : DBNull.Value),
        new SqlParameter("@RegionName", region != null ? region : DBNull.Value)
    };

        return this.Set<SalesPerformanceDTO>().FromSqlRaw(
            "EXEC GetSalesPerformance @ProductCategoryName, @ProductName, @RegionName",
            parameters.ToArray());
    }

    public virtual IEnumerable<SalesOrderDetailsDTO> GetSalesOrderDetails(
     string? territoryName = null,
     DateTime? startDate = null,
     DateTime? endDate = null,
     string? searchText = null,
     string? productCategoryName = null,
     string? productSubcategoryName = null,
     bool? onlineOrderFlag = null)
    {
        var parameters = new List<SqlParameter>
    {
        new SqlParameter("@TerritoryName", territoryName != null ? territoryName : DBNull.Value),
        new SqlParameter("@StartDate", startDate.HasValue ? startDate : DBNull.Value),
        new SqlParameter("@EndDate", endDate.HasValue ? endDate : DBNull.Value),
        new SqlParameter("@Search", searchText != null ? searchText : DBNull.Value),
        new SqlParameter("@ProductCategoryName", productCategoryName != null ? productCategoryName : DBNull.Value),
        new SqlParameter("@ProductSubcategoryName", productSubcategoryName != null ? productCategoryName : DBNull.Value),
        new SqlParameter("@OnlineOrderFlag", onlineOrderFlag.HasValue ? onlineOrderFlag : DBNull.Value)
    };

        return this.Set<SalesOrderDetailsDTO>().FromSqlRaw(
            "EXEC GetSalesOrderDetails @TerritoryName, @StartDate, @EndDate, @Search, " +
            "@ProductCategoryName, @ProductSubcategoryName, @OnlineOrderFlag",
            parameters.ToArray());
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<SalesOrderDetailsDTO>().HasKey(dto => dto.SalesOrderDetailID);
    }

}