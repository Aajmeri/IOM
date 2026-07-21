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

builder.Services.AddDbContext<IOMContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("IOM") ?? throw new InvalidOperationException("Connection string 'IOM' not found."),
        x => x.MigrationsAssembly("IOM.Data"))
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

var jwtKey = builder.Configuration["Jwt:Key"] ?? "IOM_SuperSecret_Key_2024_DoNotShare_32Chars!!";
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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularDev", policy =>
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<IOMContext>();
    context.Database.Migrate();
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
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "IOM V1");
});
app.UseCors("AngularDev");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
