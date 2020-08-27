using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

namespace EC_API.SignalrHub
{
    public class ECHub : Hub
    {

        static HashSet<string> CurrentConnections = new HashSet<string>();
        private readonly static ConnectionMapping<string> _connections =
         new ConnectionMapping<string>();

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task CheckOnline()
        {
            await Clients.All.SendAsync("Online", CurrentConnections.Count);
        }
        public override async Task OnConnectedAsync()
        {
            var id = Context.ConnectionId;
            CurrentConnections.Add(id);
            await Clients.All.SendAsync("Online", CurrentConnections.Count);
            _connections.Add(id, Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connection = CurrentConnections.FirstOrDefault(x => x == Context.ConnectionId);
            if (connection != null)
            {
                CurrentConnections.Remove(connection);
                _connections.Remove(connection, Context.ConnectionId);
            }
            await Clients.All.SendAsync("Online", CurrentConnections.Count);
            await base.OnDisconnectedAsync(exception);
        }

        //return list of all active connections
        public List<string> GetAllActiveConnections()
        {
            return CurrentConnections.ToList();
        }
        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }
    }
}