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
        public ActionResult<PaginatedResult<SalesOrderDetailsDTO>> GetSalesDetails(
             [FromQuery] string? startDate,
             [FromQuery] string? endDate,
             [FromQuery] string? territory = null,
             [FromQuery] string? searchText = null,
             [FromQuery] string? category = null,
             [FromQuery] string? subcategory = null,
             [FromQuery] bool? onlineOrder = null,
             [FromQuery] int pageNumber = 1,
             [FromQuery] int pageSize = 10)
        {
            var cacheKey = GenerateSalesDetailsCacheKey(startDate, endDate, territory, searchText, category, subcategory, onlineOrder, pageNumber, pageSize);

            var cacheData = _cacheService.GetData<PaginatedResult<SalesOrderDetailsDTO>>(cacheKey);

            if (cacheData != null && cacheData.Count > 0) { return Ok(cacheData); }

            DateTime? parsedStartDate = string.IsNullOrEmpty(startDate) ? null : DateTime.Parse(startDate);
            DateTime? parsedEndDate = string.IsNullOrEmpty(endDate) ? null : DateTime.Parse(endDate);

            int itemsToSkip = (pageNumber - 1) * pageSize;
            var salesDetails = _context.GetSalesOrderDetails(
        territory,
        parsedStartDate,
        parsedEndDate,
        searchText,
        category,
        subcategory,
        onlineOrder);

            int count = salesDetails.Count();

            salesDetails = salesDetails.Skip(itemsToSkip).Take(pageSize);

            var results = salesDetails.ToList();

            var paginatedResult = new PaginatedResult<SalesOrderDetailsDTO>
            {
                Count = count,
                Results = results
            };

            var expiryTime = DateTimeOffset.Now.AddDays(1);
            _cacheService.SetData<PaginatedResult<SalesOrderDetailsDTO>>(cacheKey, paginatedResult, expiryTime);

            

            return Ok(paginatedResult);

        }

        [HttpGet]
        [Route("performance")]
        public ActionResult<IEnumerable<SalesPerformanceDTO>> GetSalesPerformance(
        [FromQuery] string? product,
        [FromQuery] string? category,
        [FromQuery] string? territory,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
        {
            var cacheKey = GenerateSalesPerformanceCacheKey(product, territory, category, pageNumber, pageSize);

            var cacheData = _cacheService.GetData<PaginatedResult<SalesPerformanceDTO>>(cacheKey);

            if (cacheData != null && cacheData.Count > 0) { return Ok(cacheData); }

            int itemsToSkip = (pageNumber - 1) * pageSize;
            var salesPerformance = _context.GetSalesPerformance(category, product, territory);


            int count = salesPerformance.Count();

            salesPerformance = salesPerformance.Skip(itemsToSkip).Take(pageSize);

            var results = salesPerformance.ToList();

            var paginatedResult = new PaginatedResult<SalesPerformanceDTO>
            {
                Count = count,
                Results = results
            };

            var expiryTime = DateTimeOffset.Now.AddDays(1);
            _cacheService.SetData<PaginatedResult<SalesPerformanceDTO>>(cacheKey, paginatedResult, expiryTime);

            return Ok(paginatedResult);
        }


        private string GenerateSalesDetailsCacheKey(string? startDate, string? endDate, string? territory, string? searchText, string? category, string? subcategory, bool? onlineOrder, int pageNumber, int pageSize)
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

            if (!string.IsNullOrEmpty(searchText))
            {
                stringBuilder.Append($"SearchText={searchText};");
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
