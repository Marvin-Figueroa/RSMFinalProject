using Microsoft.AspNetCore.Mvc;

using RSMFinalProject.Server.Data;
using RSMFinalProject.Server.DTOs;
using RSMFinalProject.Server.Models;
using RSMFinalProject.Server.Services;
using System.Text;

namespace RSMFinalProject.Server.Controllers
{
    [Route("api/v1/sales")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly AdventureWorks2022Context _context;
        private readonly ICacheService _cacheService;

        public SalesController(AdventureWorks2022Context context, ICacheService cacheService)
        {
            _context = context;
            _cacheService = cacheService;
        }

        [HttpGet]
        [Route("details")]
        public async Task<ActionResult<PaginatedResult<SalesOrderDetailsDTO>>> GetSalesDetails(
             [FromQuery] string? startDate,
             [FromQuery] string? endDate,
             [FromQuery] string? territory,
             [FromQuery] string? customer,
             [FromQuery] string? category,
             [FromQuery] string? subcategory,
             [FromQuery] bool? onlineOrder,
             [FromQuery] int pageNumber = 1,
             [FromQuery] int pageSize = 10)
        {
            var cacheKey = GenerateSalesDetailsCacheKey(startDate, endDate, territory, customer, category, subcategory, onlineOrder, pageNumber, pageSize);
            var cacheData = _cacheService.GetData<PaginatedResult<SalesOrderDetailsDTO>>(cacheKey);
            if (cacheData != null && cacheData.Count > 0) { return Ok(cacheData); }

            var validStartDateString = !string.IsNullOrEmpty(startDate) ? DateTime.TryParse(startDate, out DateTime startDateResult) : false;
            var validEndDateString = !string.IsNullOrEmpty(startDate) ? DateTime.TryParse(startDate, out DateTime endDateResult) : false;

            DateTime? parsedStartDate = validStartDateString ? DateTime.Parse(startDate) : null;
            DateTime? parsedEndDate = validEndDateString ? DateTime.Parse(endDate) : null;

            var salesDetails = await _context.GetSalesOrderDetails(
        territory,
        parsedStartDate,
        parsedEndDate,
        customer,
        category,
        subcategory,
        onlineOrder,
        pageNumber,
        pageSize);

            var paginatedResult = new PaginatedResult<SalesOrderDetailsDTO>
            {
                Count = salesDetails.Item2,
                Results = salesDetails.Item1
            };

            var expiryTime = DateTimeOffset.Now.AddDays(1);
            _cacheService.SetData<PaginatedResult<SalesOrderDetailsDTO>>(cacheKey, paginatedResult, expiryTime);

            return Ok(paginatedResult);

        }

        [HttpGet]
        [Route("performance")]
        public async Task<ActionResult<PaginatedResult<SalesPerformanceDTO>>> GetSalesPerformance(
        [FromQuery] string? product,
        [FromQuery] string? category,
        [FromQuery] string? territory,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
        {
            var cacheKey = GenerateSalesPerformanceCacheKey(product, territory, category, pageNumber, pageSize);
            var cacheData = _cacheService.GetData<PaginatedResult<SalesPerformanceDTO>>(cacheKey);
            if (cacheData != null && cacheData.Count > 0) { return Ok(cacheData); }

            var salesPerformance = await _context.GetSalesPerformance(category, product, territory, pageNumber, pageSize);

            var paginatedResult = new PaginatedResult<SalesPerformanceDTO>
            {
                Count = salesPerformance.Item2,
                Results = salesPerformance.Item1
            };

            var expiryTime = DateTimeOffset.Now.AddDays(1);
            _cacheService.SetData<PaginatedResult<SalesPerformanceDTO>>(cacheKey, paginatedResult, expiryTime);

            return Ok(paginatedResult);
        }


        private string GenerateSalesDetailsCacheKey(string? startDate, string? endDate, string? territory, string? customer, string? category, string? subcategory, bool? onlineOrder, int pageNumber, int pageSize)
        {
            var stringBuilder = new StringBuilder();

            stringBuilder.Append("SalesDetails:");

            if (!string.IsNullOrEmpty(startDate))
            {
                stringBuilder.Append($"StartDate={startDate};");
            }

            if (!string.IsNullOrEmpty(endDate))
            {
                stringBuilder.Append($"EndDate={endDate};");
            }

            if (!string.IsNullOrEmpty(territory))
            {
                stringBuilder.Append($"Territory={territory};");
            }

            if (!string.IsNullOrEmpty(customer))
            {
                stringBuilder.Append($"Customer={customer};");
            }

            if (!string.IsNullOrEmpty(category))
            {
                stringBuilder.Append($"Category={category};");
            }

            if (!string.IsNullOrEmpty(subcategory))
            {
                stringBuilder.Append($"Subcategory={subcategory};");
            }

            if (onlineOrder.HasValue)
            {
                stringBuilder.Append($"OnlineOrder={onlineOrder};");
            }

            stringBuilder.Append($"PageNumber={pageNumber};");
            stringBuilder.Append($"PageSize={pageSize}");

            return stringBuilder.ToString();
        }

        private string GenerateSalesPerformanceCacheKey(string? product, string? category, string? territory, int pageNumber, int pageSize)
        {
            var stringBuilder = new StringBuilder();

            stringBuilder.Append("SalesPerformance:");

      

            if (!string.IsNullOrEmpty(product))
            {
                stringBuilder.Append($"Product={product};");
            }

            if (!string.IsNullOrEmpty(category))
            {
                stringBuilder.Append($"Category={category};");
            }

            if (!string.IsNullOrEmpty(territory))
            {
                stringBuilder.Append($"Territory={territory};");
            }

            if (!string.IsNullOrEmpty(category))
            {
                stringBuilder.Append($"Category={category};");
            }

            stringBuilder.Append($"PageNumber={pageNumber};");
            stringBuilder.Append($"PageSize={pageSize}");

            return stringBuilder.ToString();
        }



    }
}
