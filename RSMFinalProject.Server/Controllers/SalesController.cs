using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RSMFinalProject.Server.Data;
using RSMFinalProject.Server.Models;

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
        [Route("")]
        public ActionResult<IEnumerable<SalesData>> GetSalesData([FromQuery] string startDate = "2011-05-31",
    [FromQuery] string endDate = "",
    [FromQuery] string territory = "",
    [FromQuery] string customerPerson = "",
    [FromQuery] string customerStore = "",
    [FromQuery] string product = "",
    [FromQuery] string category = "",
    [FromQuery] string subcategory = "",
    [FromQuery] string salesperson = "",
    [FromQuery] bool onlineOrder = false)
        {
            var result = _context.SalesOrderHeaders

    .Join(_context.SalesTerritories,
        soh => soh.TerritoryId,
        st => st.TerritoryId,
        (soh, st) => new { 
            SalesOrderHeader = soh, 
            SalesTerritory = st })

    .Join(_context.Customers,
        joined => joined.SalesOrderHeader.CustomerId,
        c => c.CustomerId,
        (joined, c) => new { 
            joined.SalesOrderHeader, 
            joined.SalesTerritory, 
            Customer = c })

    .Join(_context.People,
        joined => joined.Customer.PersonId,
        p => p.BusinessEntityId,
        (joined, p) => new { 
            joined.SalesOrderHeader, 
            joined.SalesTerritory, 
            joined.Customer, Person = p })

    .GroupJoin(_context.Stores,
        joined => joined.Customer.StoreId,
        s => s.BusinessEntityId,
        (joined, storeGroup) => new { 
            joined.SalesOrderHeader, 
            joined.SalesTerritory, 
            joined.Customer, 
            joined.Person, 
            Store = storeGroup.FirstOrDefault() })
    
    .Join(_context.SalesOrderDetails,
        joined => joined.SalesOrderHeader.SalesOrderId,
        sod => sod.SalesOrderId,
        (joined, sod) => new { 
            joined.SalesOrderHeader, 
            joined.SalesTerritory, 
            joined.Customer, 
            joined.Person, 
            joined.Store, 
            SalesOrderDetail = sod })

    .Join(_context.Products,
        joined => joined.SalesOrderDetail.ProductId,
        prod => prod.ProductId,
        (joined, prod) => new { 
            joined.SalesOrderHeader, 
            joined.SalesTerritory, 
            joined.Customer, 
            joined.Person, 
            joined.Store, 
            joined.SalesOrderDetail, 
            Product = prod })

    .Join(_context.ProductSubcategories,
        joined => joined.Product.ProductSubcategoryId,
        psc => psc.ProductSubcategoryId,
        (joined, psc) => new { 
            joined.SalesOrderHeader, 
            joined.SalesTerritory, 
            joined.Customer, 
            joined.Person, 
            joined.Store, 
            joined.SalesOrderDetail, 
            joined.Product, 
            ProductSubcategory = psc })

    .Join(_context.ProductCategories,
        joined => joined.ProductSubcategory.ProductCategoryId,
        pc => pc.ProductCategoryId,
        (joined, pc) => new { 
            joined.SalesOrderHeader, 
            joined.SalesTerritory, 
            joined.Customer, 
            joined.Person, 
            joined.Store,
            joined.SalesOrderDetail, 
            joined.Product, 
            joined.ProductSubcategory, 
            ProductCategory = pc })

    .Join(_context.SalesPeople,
        joined => joined.SalesOrderHeader.SalesPersonId,
        sp => sp.BusinessEntityId,
        (joined, sp) => new { 
            joined.SalesOrderHeader, 
            joined.SalesTerritory, 
            joined.Customer, 
            joined.Person, 
            joined.Store,
            joined.SalesOrderDetail,
            joined.Product,
            joined.ProductSubcategory,
            joined.ProductCategory,
            SalesPerson = sp })
    
    .Join(_context.Employees,
        joined => joined.SalesPerson.BusinessEntityId,
    e => e.BusinessEntityId,
        (joined, e) => new { 
            joined.SalesOrderHeader, 
            joined.SalesTerritory, 
            joined.Customer, 
            joined.Person, 
            joined.Store,
            joined.SalesOrderDetail,
            joined.Product,
            joined.ProductSubcategory,
            joined.ProductCategory,
            joined.SalesPerson, 
            Employee = e})
    
    .Join(_context.People,
        joined => joined.Employee.BusinessEntityId,
    p2 => p2.BusinessEntityId,
        (joined, p2) => new {
            joined.SalesOrderHeader,
            joined.SalesTerritory,
            joined.Customer,
            joined.Person,
            joined.Store,
            joined.SalesOrderDetail,
            joined.Product,
            joined.ProductSubcategory,
            joined.ProductCategory,
            joined.SalesPerson,
            joined.Employee, 
            Person2 = p2 })
    .Select(result => new SalesData
    {
        OrderID = result.SalesOrderHeader.SalesOrderId,
        OrderDetailID = result.SalesOrderDetail.SalesOrderDetailId,
        Date = result.SalesOrderHeader.OrderDate,
        Territory = result.SalesTerritory.Name,
        OnlineOrder = result.SalesOrderHeader.OnlineOrderFlag,
        CustomerPerson = result.Person.FirstName + " " + result.Person.LastName,
        CustomerStore = result.Store != null ? result.Store.Name : "",
        Salesperson = result.Person2 != null ? result.Person2.FirstName + " " + result.Person2.LastName : "",
        Product = result.Product.Name,
        Category = result.ProductCategory.Name,
        Subcategory = result.ProductSubcategory.Name,
        Quantity = result.SalesOrderDetail.OrderQty,
        UnitPrice = result.SalesOrderDetail.UnitPrice,
        TotalPrice =    result.SalesOrderDetail.LineTotal
    })
    .Where(result => result.Date >= DateTime.Parse(startDate)
        && result.Date <= (endDate.IsNullOrEmpty() ? DateTime.Today : DateTime.Parse(endDate))
        && result.Territory.Contains(territory)
        && result.CustomerPerson.Contains(customerPerson)
        && result.CustomerStore.Contains(customerStore)
        && result.Product.Contains(product)
        && result.Category.Contains(category)
        && result.Subcategory.Contains(subcategory)
        && result.Salesperson.Contains(salesperson)
        && result.OnlineOrder == onlineOrder)
    .OrderBy(result => result.OrderID)
    .ThenByDescending(result  => result.Date)
    .ThenBy(result => result.Territory)
    .ThenBy(result => result.CustomerPerson)
    .ThenBy(result => result.CustomerStore)
    .ThenBy(result => result.Salesperson)
    .ThenBy(result => result.Product)
    .ThenBy(result => result.Category)
    .ThenBy(result => result.Subcategory)
    .Take(20)
    .ToList();

            return result;

        }

    }
}
