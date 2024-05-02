namespace RSMFinalProject.Server.Models
{
    public class PaginatedResult<T>
    {
        public int Count { get; set; }
        public IEnumerable<T> Results { get; set; }
    }
}
