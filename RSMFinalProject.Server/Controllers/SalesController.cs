using Microsoft.AspNetCore.Mvc;

using RSMFinalProject.Server.Data;
using RSMFinalProject.Server.DTOs;

namespace RSMFinalProject.Server.Controllers
{
    [Route("api/v1/sales")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly AdventureWorks2022Context _context;

        public SalesController(AdventureWorks2022Context context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("details")]
        public ActionResult<IEnumerable<SalesOrderDetailsDTO>> GetSalesDetails(
             [FromQuery] string? startDate,
             [FromQuery] string? endDate,
             [FromQuery] string? territory = null,
             [FromQuery] string? customerPerson = null,
             [FromQuery] string? customerStore = null,
             [FromQuery] string? product = null,
             [FromQuery] string? category = null,
             [FromQuery] string? subcategory = null,
             [FromQuery] string? salesperson = null,
             [FromQuery] bool? onlineOrder = null,
             [FromQuery] int pageNumber = 1,
             [FromQuery] int pageSize = 20)
        {
            DateTime? parsedStartDate = string.IsNullOrEmpty(startDate) ? null : DateTime.Parse(startDate);
            DateTime? parsedEndDate = string.IsNullOrEmpty(endDate) ? null : DateTime.Parse(endDate);

            int itemsToSkip = (pageNumber - 1) * pageSize;
            var salesDetails = _context.GetSalesOrderDetails(
        territory,
        parsedStartDate,
        parsedEndDate,
        customerPerson,
        customerStore,
        product,
        category,
        subcategory,
        salesperson,
        onlineOrder).Skip(itemsToSkip)
                                    .Take(pageSize)
                                    .ToList(); ;

            return Ok(salesDetails);

        }

        [HttpGet]
        [Route("performance")]
        public ActionResult<IEnumerable<SalesPerformanceDTO>> GetSalesPerformance(
        [FromQuery] string? product,
        [FromQuery] string? category,
        [FromQuery] string? territory,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
        {
            int itemsToSkip = (pageNumber - 1) * pageSize;
            var salesPerformance = _context.GetSalesPerformance(category, product, territory)
                                    .Skip(itemsToSkip)
                                    .Take(pageSize)
                                    .ToList();

            return Ok(salesPerformance);
        }


    }
}
