﻿namespace HealthHub.Application.Models
{
    public class UserDto
    {
        public string? UserId { get; set; }
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public List<string>? Roles { get; set; }
    }
}
