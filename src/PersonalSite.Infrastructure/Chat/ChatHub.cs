using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using PersonalSite.Infrastructure.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonalSite.Infrastructure.Chat
{
    public class ChatHub : Hub
    {
        private readonly string ModKey;
        private static readonly ConcurrentDictionary<string, string> Users = new ConcurrentDictionary<string, string>();
        private static readonly ConcurrentDictionary<string, string> Mods = new ConcurrentDictionary<string, string>();

        public ChatHub(IOptions<Settings> settings)
        {
            ModKey = settings.Value.ChatModKey;
        }

        public async Task SendMessage(string user, string message, string targetId)
        {
            if (!IsMod())
            {
                message = $"{user} says: {message}";
                var clients = GetRecipients(targetId);

                await Clients.Clients(clients).SendAsync("ReceiveMessage", user, message);
            }
            else
            {
                var target = GetTargetForMod(targetId);
                var userMsg = $"{Mods[Context.ConnectionId]} says: {message}";

                var modMsg = !string.IsNullOrWhiteSpace(target)
                    ? $"to {Users[target]}: {message}"
                    : userMsg;

                await Clients.Caller.SendAsync("ReceiveMessage", user, modMsg);

                if (!string.IsNullOrWhiteSpace(target))
                {
                    await Clients.Client(target).SendAsync("ReceiveMessage", user, userMsg);
                }
            }
        }

        public async Task NewUser(string user)
        {
            if (string.IsNullOrWhiteSpace(user))
            {
                throw new ArgumentNullException("User name cannot be null or empty");
            }

            var isMod = user.Length >= ModKey.Length
                && user.Substring(user.Length - ModKey.Length, ModKey.Length) == ModKey;

            var id = Context.ConnectionId.Substring(0, 7);

            if (isMod)
            {
                if (Mods.Count >= 1)
                {
                    throw new InvalidOperationException("A mod already exists.");
                }

                var modName = user.Substring(0, user.Length - ModKey.Length);
                
                Users.TryRemove(Context.ConnectionId, out string name);
                Mods.TryAdd(Context.ConnectionId, modName);

                await Clients.Caller.SendAsync("GrantMod", true);
                await Clients.Caller.SendAsync("ReceiveUsers", GetUsers(isMod));
                await GetNonModUsers().SendAsync("ReceiveNewUser", id, modName);
            }
            else
            {
                var mod = GetMod();

                Users[Context.ConnectionId] = user;

                await Clients.Caller.SendAsync("ReceiveUsers", GetUsers(isMod));

                if (mod != null)
                {
                    await mod.SendAsync("ReceiveNewUser", id, user);
                }
            }
        }

        public override Task OnConnectedAsync()
        {
            var id = Context.ConnectionId;

            Users.TryAdd(id, "");

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var isMod = IsMod();
            var id = Context.ConnectionId.Substring(0, 7);

            string user;

            if (isMod)
            {
                Mods.TryRemove(Context.ConnectionId, out user);
            }
            else
            {
                Users.TryRemove(Context.ConnectionId, out user);
            }

            var target = isMod ? Clients.All : GetMod();

            if (target != null)
            {
                target.SendAsync("UserLeft", id, user);
            }

            return base.OnDisconnectedAsync(exception);
        }

        private IClientProxy GetNonModUsers()
        {
            var ids = Users.Keys.ToList();
            return Clients.Clients(ids);
        }

        private IReadOnlyList<string> GetRecipients(string targetId)
        {
            var isMod = IsMod();

            var targets = new List<string>()
            {
                Context.ConnectionId,
                isMod ? GetTargetForMod(targetId) : GetModId()
            };

            return targets.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
        }

        private string GetTargetForMod(string targetId)
        {
            try
            {
                return Users.Keys.Where(x => x.Substring(0, 7) == targetId).Single();
            }
            catch
            {
                return "";
            }
        }

        private IClientProxy GetMod()
        {
            try
            {
                return Clients.Client(Mods.Keys.Single());
            }
            catch (Exception e)
            {
                return null;
            }
        }

        private string GetModId()
        {
            try
            {
                return Mods.Keys.Single();
            }
            catch (Exception e)
            {
                return "";
            }
        }

        private IEnumerable<dynamic> GetUsers(bool isMod)
        {
            var users = Users.Select(x => new { id = x.Key.Substring(0, 7), name = x.Value }).ToList();

            users = isMod ? users : users
                .Where(x => x.id.Substring(0, 7) == Context.ConnectionId.Substring(0, 7)).ToList();

            var mod = Mods.Select(x => new { id = x.Key.Substring(0, 7), name = x.Value }).SingleOrDefault();

            if (mod != null)
            {
                users.Add(mod);
            }

            return users;
        }

        private bool IsMod()
        {
            return Mods.Keys.Contains(Context.ConnectionId);
        }
    }
}
