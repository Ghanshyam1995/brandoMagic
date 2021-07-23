using BrandoMagic.Application.Interfaces;
using BrandoMagic.Infrastructure.Repository;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Data;

namespace BrandoMagic.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication();

            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IHomeRepository, HomeRepository>();
            services.AddScoped<IBrandRepository, BrandRepository>();

            string dbConnectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddTransient<IDbConnection>((sp) => new SqlConnection(dbConnectionString));
            return services;
        }
    }
}