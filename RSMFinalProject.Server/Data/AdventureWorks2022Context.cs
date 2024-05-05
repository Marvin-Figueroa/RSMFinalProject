using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RSMFinalProject.Server.DTOs;
using System.Data;

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
    public virtual async Task<(IEnumerable<SalesPerformanceDTO>, int)> GetSalesPerformance(
        string? category, string? product, string? region, int pageNumber, int pageSize)
    {
        var parameters = new List<SqlParameter>
    {
        new SqlParameter("@ProductCategoryName", category != null ? category : DBNull.Value),
        new SqlParameter("@ProductName", product != null ? product : DBNull.Value),
        new SqlParameter("@RegionName", region != null ? region : DBNull.Value),
        new SqlParameter("@PageNumber", pageNumber),
        new SqlParameter("@PageSize", pageSize),
        new SqlParameter("@TotalCount", SqlDbType.Int) { Direction = ParameterDirection.Output } 
    };

        // Execute the stored procedure asynchronously
        var result = await this.Set<SalesPerformanceDTO>()
                                .FromSqlRaw("EXEC GetSalesPerformance @ProductCategoryName, @ProductName, @RegionName, @PageNumber, @PageSize, @TotalCount OUTPUT",
                                            parameters.ToArray())
                                .ToListAsync();

        // Retrieve the output parameter value
        int totalCount = (int)parameters.FirstOrDefault(p => p.ParameterName == "@TotalCount").Value;

        return (result, totalCount);
    }



    public virtual async Task<(IEnumerable<SalesOrderDetailsDTO>, int)> GetSalesOrderDetails(
     string? territoryName,
     DateTime? startDate,
     DateTime? endDate,
     string? customer,
     string? productCategoryName,
     string? productSubcategoryName,
     bool? onlineOrderFlag,
     int pageNumber,
     int pageSize)
    {
        var parameters = new List<SqlParameter>
    {
        new SqlParameter("@TerritoryName", territoryName != null ? territoryName : DBNull.Value),
        new SqlParameter("@StartDate", startDate.HasValue ? startDate : DBNull.Value),
        new SqlParameter("@EndDate", endDate.HasValue ? endDate : DBNull.Value),
        new SqlParameter("@CustomerName", customer != null ? customer : DBNull.Value),
        new SqlParameter("@ProductCategoryName", productCategoryName != null ? productCategoryName : DBNull.Value),
        new SqlParameter("@ProductSubcategoryName", productSubcategoryName != null ? productCategoryName : DBNull.Value),
        new SqlParameter("@OnlineOrderFlag", onlineOrderFlag.HasValue ? onlineOrderFlag : DBNull.Value),
        new SqlParameter("@PageNumber", pageNumber),
        new SqlParameter("@PageSize", pageSize),
        new SqlParameter("@TotalCount", SqlDbType.Int) { Direction = ParameterDirection.Output } 
    };

        // Execute the stored procedure asynchronously
        var result = await this.Set<SalesOrderDetailsDTO>()
                                .FromSqlRaw("EXEC GetSalesOrderDetails @TerritoryName, @StartDate, @EndDate, @CustomerName, " +
                                            "@ProductCategoryName, @ProductSubcategoryName, @OnlineOrderFlag, @PageNumber, " +
                                            "@PageSize, @TotalCount OUTPUT",
                                            parameters.ToArray())
                                .ToListAsync();

        // Retrieve the output parameter value
        int totalCount = (int)parameters.FirstOrDefault(p => p.ParameterName == "@TotalCount").Value;

        return (result, totalCount);
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<SalesOrderDetailsDTO>().HasKey(dto => dto.SalesOrderDetailID);
    }

}