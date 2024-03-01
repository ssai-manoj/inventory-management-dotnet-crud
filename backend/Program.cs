using backend.Model;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();


        builder.Services.AddDbContext<ProductContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("ProductContext"));
        });

        var app = builder.Build();

        app.MapControllers();

        app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

        app.Run();
    }
}