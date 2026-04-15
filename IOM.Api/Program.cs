using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;
using IOM.Data;
using IOM.Core;
using IOM.Core.Services;
using IOM.Service.Services;
using IOM.Api.Filters;
using System;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi;
using FluentValidation;
using IOM.Api.Mapping;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<IOMContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("IOM") ?? throw new InvalidOperationException("Connection string 'IOM' not found."))
    .EnableSensitiveDataLogging());
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
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.RoutePrefix = "";
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "IOM V1");
});
app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Index}/{action=Index}/{id?}");
app.Run();