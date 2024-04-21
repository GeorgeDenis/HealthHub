using HealthHub.API.Models;
using System.Collections.Concurrent;

namespace HealthHub.API.Hubs
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new ConcurrentDictionary<string, UserConnection>();
        public ConcurrentDictionary<string, UserConnection> Connections => _connections;
    }
}
