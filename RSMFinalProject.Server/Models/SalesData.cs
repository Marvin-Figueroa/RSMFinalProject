namespace RSMFinalProject.Server.Models
{
    public class SalesData
    {
        public int OrderID { get; set; }

        public int OrderDetailID { get; set; }

        public DateTime Date { get; set; }
        public string Territory { get; set; }

        public Boolean OnlineOrder { get; set; }
        public string CustomerPerson { get; set; }
        public string CustomerStore { get; set; }
        public string Salesperson { get; set; }
        public string Product { get; set; }
        public string Category { get; set; }
        public string Subcategory { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }

}
