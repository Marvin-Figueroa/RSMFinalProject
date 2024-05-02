namespace RSMFinalProject.Server.DTOs
{
    public class SalesOrderDetailsDTO
    {
        public int OrderID { get; set; }
        public int SalesOrderDetailID { get; set; }
        public DateTime Date { get; set; }
        public bool OnlineOrder { get; set; }
        public string Territory { get; set; }
        public string? CustomerPerson { get; set; }
        public string? Salesperson { get; set; }
        public string Product { get; set; }
        public string Category { get; set; }
        public string Subcategory { get; set; }
        public short Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }

}
