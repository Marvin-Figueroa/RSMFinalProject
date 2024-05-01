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
}