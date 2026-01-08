using System;
using CongDuLieuDatDaiPhiaNam.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CongDuLieuDatDaiPhiaNam.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var provider = configuration["Database:Provider"] ?? "PostgreSQL";
            var connectionString = provider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase)
                ? configuration.GetConnectionString("SqlServer")
                : configuration.GetConnectionString("PostgreSQL");

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new InvalidOperationException("Missing database connection string configuration.");
            }

            services.AddDbContext<CdlddpnDbContext>(options =>
            {
                if (provider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase))
                {
                    options.UseSqlServer(connectionString);
                }
                else
                {
                    options.UseNpgsql(connectionString);
                }
            });

            return services;
        }
    }
}
