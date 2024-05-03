
using StackExchange.Redis;
using System.Text.Json;

namespace RSMFinalProject.Server.Services
{
    public class RedisCacheService : ICacheService
    {
        private IDatabase _redis;

        public RedisCacheService(IConfiguration configuration)
        {   
            var connectionString = configuration.GetConnectionString("redisServer");
            var redisConn = ConnectionMultiplexer.Connect(connectionString);
            _redis = redisConn.GetDatabase();
        }
        T ICacheService.GetData<T>(string key)
        {
            var value = _redis.StringGet(key);

            if(!string.IsNullOrEmpty(value))
            {
                return JsonSerializer.Deserialize<T>(value);
            }

            return default;
        }

        object ICacheService.RemoveData(string key)
        {
            var exists = _redis.KeyExists(key);

            if(exists) return _redis.KeyDelete(key);

            return false;
        }

        bool ICacheService.SetData<T>(string key, T value, DateTimeOffset expirationTime)
        {
            var expiryTime = expirationTime.DateTime.Subtract(DateTime.Now);
            return _redis.StringSet(key, JsonSerializer.Serialize(value), expiryTime);
        }
    }
}
