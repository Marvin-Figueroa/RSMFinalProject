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
        [Route("performance")]
        public ActionResult<IEnumerable<SalesPerformanceDTO>> GetSalesPerformance(
        [FromQuery] string? product,
        [FromQuery] string? category,
        [FromQuery] string? territory)
        {
            var salesPerformance = _context.GetSalesPerformance(category, product, territory).Take(20);

            return Ok(salesPerformance);
        }


    }
}
