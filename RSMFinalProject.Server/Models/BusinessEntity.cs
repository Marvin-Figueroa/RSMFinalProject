namespace RSMFinalProject.Server.Models;

public partial class BusinessEntity
{
    /// <summary>
    /// Primary key for all customers, vendors, and employees.
    /// </summary>
    public int BusinessEntityId { get; set; }

    /// <summary>
    /// ROWGUIDCOL number uniquely identifying the record. Used to support a merge replication sample.
    /// </summary>
    public Guid Rowguid { get; set; }

    /// <summary>
    /// Date and time the record was last updated.
    /// </summary>
    public DateTime ModifiedDate { get; set; }

    public virtual Person? Person { get; set; }

    public virtual Store? Store { get; set; }

}

