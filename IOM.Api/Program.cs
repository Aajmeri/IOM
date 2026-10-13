using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
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
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi;
using FluentValidation;
using IOM.Api.Mapping;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("IOM");
if (string.IsNullOrWhiteSpace(connectionString))
{
    var message = builder.Environment.IsProduction()
        ? "ConnectionStrings:IOM is not configured. Set it via the ConnectionStrings__IOM environment variable (or a secrets manager) before running in Production."
        : "Connection string 'IOM' not found.";
    throw new InvalidOperationException(message);
}

builder.Services.AddDbContext<IOMContext>(options =>
{
    options.UseSqlServer(connectionString, x => x.MigrationsAssembly("IOM.Data"));
    options.ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning));

    // Logs raw SQL parameter values - useful for local debugging, but never appropriate once
    // real customer data is involved (Test and Production databases can hold that).
    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging();
    }
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddTransient<IInvoiceService, InvoiceService>();
builder.Services.AddTransient<IItemService, ItemService>();
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<ISupplierService, SupplierService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IDeliveryService, DeliveryService>();
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddTransient<IAvailabilityService, AvailabilityService>();
builder.Services.AddTransient<IEmailService, SmtpEmailService>();
// Simulated gateway - no real payment provider is configured for this repo. Replace with a real
// IPaymentService implementation to take real payments.
builder.Services.AddTransient<IPaymentService, SimulatedPaymentService>();
builder.Services.AddTransient<IReceiptService, ReceiptService>();

builder.Services.AddScoped<ProductMapper>();
builder.Services.AddScoped<SupplierMapper>();
builder.Services.AddScoped<InvoiceMapper>();
builder.Services.AddScoped<ItemMapper>();
builder.Services.AddScoped<DeliveryMapper>();
builder.Services.AddScoped<OrderMapper>();
builder.Services.AddScoped<UserMapper>();

var jwtKey = builder.Configuration["Jwt:Key"];
if (builder.Environment.IsProduction())
{
    if (string.IsNullOrWhiteSpace(jwtKey))
    {
        throw new InvalidOperationException(
            "Jwt:Key is not configured. Set it via the Jwt__Key environment variable (or a secrets manager) to a " +
            "strong, unique secret before running in Production - do not reuse the committed development placeholder.");
    }
}
else
{
    jwtKey ??= "IOM_SuperSecret_Key_2024_DoNotShare_32Chars!!";
}
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "IOM";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "IOM";

builder.Services.AddAuthentication(options =>
{
    // Angular SPA authenticates via JWT bearer tokens.
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ValidationFilter());
});
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "IOM", Version = "v1" });
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.ParameterLocation.Header,
        Description = "Enter: Bearer {token}"
    });
    options.AddSecurityRequirement(document =>
        new Microsoft.OpenApi.OpenApiSecurityRequirement
        {
            {
                new Microsoft.OpenApi.OpenApiSecuritySchemeReference("Bearer", document, null),
                new List<string>()
            }
        });
});

// Empty (the Production default) means no cross-origin policy at all, which is correct there -
// the built Angular app is served from this same host, so it never makes a cross-origin request.
var corsAllowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularDev", policy =>
    {
        if (corsAllowedOrigins.Length > 0)
        {
            policy.WithOrigins(corsAllowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<IOMContext>();
    context.Database.Migrate();

    // Bogus fake data and a known admin@admin.com/Admin123! login are convenient for local dev,
    // manual QA, and the automated "Testing" host (see IomWebApplicationFactory) - but must never
    // run against a real Production database, where this would plant fake records and silently
    // reset any admin account named admin@admin.com back to a public, well-known password.
    if (!app.Environment.IsProduction())
    {
        DataSeeder.Seed(context);

        const string adminEmail = "admin@admin.com";
        const string adminPassword = "Admin123!";
        var admin = await context.Users.FirstOrDefaultAsync(u => u.Email == adminEmail);
        if (admin == null)
        {
            var userService = scope.ServiceProvider.GetRequiredService<IUserService>();
            await userService.CreateUser(new User
            {
                Id = Guid.NewGuid(),
                Name = "Admin",
                Email = adminEmail,
                Password = adminPassword,
                Role = "Admin"
            });
        }
        else
        {
            // Ensure the seeded admin can always authenticate with the known credentials.
            admin.Password = IOM.Service.Helpers.PasswordHelper.Hash(adminPassword);
            admin.Active = true;
            await context.SaveChangesAsync();
        }
    }
}

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// Swagger is a handy API explorer for Dev/Test, but shouldn't be publicly reachable in Production.
if (!app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "IOM V1");
    });
}
app.UseCors("AngularDev");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
// Unknown api/* URLs are a 404, not the SPA's index.html (which the catch-all below would
// otherwise serve with a 200). The literal "api" segment outranks the catch-all route.
app.MapFallback("/api/{**path}", context =>
{
    context.Response.StatusCode = StatusCodes.Status404NotFound;
    return System.Threading.Tasks.Task.CompletedTask;
});
app.MapFallbackToFile("index.html");

app.Run();
