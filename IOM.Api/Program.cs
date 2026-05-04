using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;
using IOM.Data;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;
using IOM.Service.Services;
using IOM.Api.Filters;
using System;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi;
using FluentValidation;
using IOM.Api.Mapping;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<IOMContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("IOM") ?? throw new InvalidOperationException("Connection string 'IOM' not found.")
    , x => x.MigrationsAssembly("IOM.Data"))
    .EnableSensitiveDataLogging()
    .ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning)));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddTransient<IInvoiceService, InvoiceService>();
builder.Services.AddTransient<IItemService, ItemService>();
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<ISupplierService, SupplierService>();
builder.Services.AddTransient<IUserService, UserService>();

builder.Services.AddScoped<ProductMapper>();
builder.Services.AddScoped<SupplierMapper>();
builder.Services.AddScoped<InvoiceMapper>();
builder.Services.AddScoped<ItemMapper>();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.LogoutPath = "/Account/Logout";
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        options.SlidingExpiration = true;
    });

builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add(new ValidationFilter());
});
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "IOM", Version = "v1" });
});

builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<IOMContext>();
    context.Database.Migrate();
    DataSeeder.Seed(context);

    if (!context.Users.Any(u => u.Role == "Admin"))
    {
        var userService = scope.ServiceProvider.GetRequiredService<IUserService>();
        await userService.CreateUser(new User
        {
            Id = Guid.NewGuid(),
            Name = "Admin",
            Email = "admin@admin.com",
            Password = "Admin123!",
            Role = "Admin"
        });
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseStatusCodePagesWithReExecute("/Home/Error/{0}");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "IOM V1");
});
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Product}/{action=Index}/{id?}");
app.Run();
