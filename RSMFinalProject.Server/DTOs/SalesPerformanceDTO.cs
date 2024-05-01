namespace RSMFinalProject.Server.DTOs
{
    public class SalesPerformanceDTO
    {   
        public long Id { get; set; }
        public string ProductName { get; set; }
        public string ProductCategory { get; set; }
        public string Region { get; set; }
        public decimal TotalSales { get; set; }
        public decimal PercentageOfTotalSalesPerRegion { get; set; }
        public decimal PercentageOfTotalCategorySalesInRegion { get; set; }
    }
}
