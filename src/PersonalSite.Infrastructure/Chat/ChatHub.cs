using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace PersonalSite.Infrastructure.Chat
{
    public class ChatHub : Hub
    {
        private static readonly ConcurrentDictionary<string, string> Users = new ConcurrentDictionary<string, string>();

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task NewUser(string user)
        {
            Users[Context.ConnectionId] = user;
            await Clients.All.SendAsync("ReceiveNewUser", user);
            await Clients.All.SendAsync("ReceiveUsers", Users.Values);
        }

        public override Task OnConnectedAsync()
        {
            var id = Context.ConnectionId;

            Users.TryAdd(id, "");

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            Users.TryRemove(Context.ConnectionId, out string user);
            Clients.All.SendAsync("ReceiveUsers", Users.Values);
            Clients.All.SendAsync("UserLeft", user);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
