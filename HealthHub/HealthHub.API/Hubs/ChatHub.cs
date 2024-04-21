using HealthHub.API.Models;
using HealthHub.Application.Features.Messages.Commands.CreateMessage;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace HealthHub.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _shared;
        private readonly IMediator _mediator;

        public ChatHub(SharedDb shared, IMediator mediator)
        {
            _shared = shared;
            _mediator = mediator;  // Mediator is injected through the constructor

        }
        public async Task JoinChat(string username, string receiver)
        {
            string groupName = CreateGroupName(username, receiver);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            //await Clients.Group(groupName).SendAsync("ReceiveMessage", "System", $"{username} has joined the chat.");
        }


        private string CreateGroupName(string user1, string user2)
        {
            int comparison = string.Compare(user1, user2);
            return comparison < 0 ? $"{user1}-{user2}" : $"{user2}-{user1}";
        }
        public async Task SendMessageToUser(string username, string receiver, string message)
        {
            string groupName = CreateGroupName(username, receiver);
            await Clients.Group(groupName).SendAsync("ReceiveMessage", username, message);
            var result = await _mediator.Send(new CreateMessageCommand
            {
                Sender = Guid.Parse(username),
                Receiver = Guid.Parse(receiver),
                Content = message
            });

            if (!result.Success)
            {
                await Clients.Caller.SendAsync("ReceiveMessage", "System", "Message not sent");
            }
        }
    }
}
