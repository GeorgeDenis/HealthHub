﻿using HealthHub.Application.Contracts.Identity;
using HealthHub.Application.Persistence;
using HealthHub.Identity.Models;
using HealthHub.Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace HealthHub.Identity
{
    public static class InfrastructureIdentityRegistrationDI
    {
        public static IServiceCollection AddInfrastrutureIdentityToDI(
                       this IServiceCollection services,
                                  IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(
               options =>
               options.UseNpgsql(
                   configuration.GetConnectionString
                   ("HealthHubUserConnection"),
                   builder =>
                   builder.MigrationsAssembly(
                       typeof(ApplicationDbContext)
                       .Assembly.FullName)));

            // For Identity  
            services.AddIdentity<ApplicationUser, IdentityRole>()
                            .AddEntityFrameworkStores<ApplicationDbContext>()
                            .AddDefaultTokenProviders();
            // Adding Authentication  
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

                        // Adding Jwt Bearer  
                        .AddJwtBearer(options =>
                        {
                            options.SaveToken = true;
                            options.RequireHttpsMetadata = false;
                            options.TokenValidationParameters = new TokenValidationParameters()
                            {
                                ValidateIssuer = true,
                                ValidateAudience = true,
                                ValidAudience = configuration["JWT:ValidAudience"],
                                ValidIssuer = configuration["JWT:ValidIssuer"],
                                ClockSkew = TimeSpan.Zero,
                                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
                            };
                        });
            services.AddScoped<IUserManager, ApplicationUserManager>();
            services.AddScoped
               <IAuthService, AuthService>();
            return services;
        }

    }
}
