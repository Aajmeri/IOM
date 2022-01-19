using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using IOM.Data;
using IOM.Core;
using IOM.Core.Services;
using IOM.Service.Services;
using Microsoft.OpenApi.Models;
using FluentValidation.AspNetCore;
using IOM.Api.Filters;

namespace IOM.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<IOMContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("IOM"),
                x => x.MigrationsAssembly("IOM.Data")).EnableSensitiveDataLogging());

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IInvoiceService, InvoiceService>();
            services.AddTransient<IItemService, ItemService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<ISupplierService, SupplierService>();
            services.AddTransient<IUserService, UserService>();

           services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        );

            // services.AddRazorPages();
            // .AddRazorPagesOptions(options => 
            //     {
            //          options.RootDirectory = "/Views";
            //          options.Conventions.AddPageRoute("/Views/Shared/_Layout", "");
            //     });

            services.AddMvc(options =>
            {
                options.Filters.Add<ValidationFilter>();
            })
                .AddFluentValidation(mvcConfiguration => mvcConfiguration.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddWebOptimizer(pipeline =>
            {
                    // pipeline.AddCssBundle("/bootstrap/css/bundle.css", "css/**/*.css");
                    //  pipeline.AddJavaScriptBundle("/bootstrap/css/bundle.js", "css/**/*.css");
                });


            services.AddSwaggerGen(options =>
                {
                    options.SwaggerDoc("v1", new OpenApiInfo { Title = "IOM", Version = "v1" });
                });

            services.AddControllers();

            services.AddAutoMapper(typeof(Startup));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            //replaces app.usestaticfile
            app.UseStaticFiles();
            // app.UseFileServer();
            app.UseWebOptimizer();
            app.UseSwaggerUI(c =>
                {
                    c.RoutePrefix = "";
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "IOM V1");
                    // c.InjectStylesheet("swagger/ui/custom.css");
                });

            app.UseRouting();
            app.Use(async (context, next) =>
            {
                var controller = context.Request.RouteValues["controller"];
                await next();
            });
            
            app.UseAuthorization();
            app.UseSwagger();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Index}/{action=Index}/{id?}");
                // endpoints.MapRazorPages();
                //Routes for pages
                // endpoints.MapControllers(); //Routes for my API controllers
            });
            // app.Run(context => {
            //         context.Response.Redirect("swagger/ui");
            //         return Task.CompletedTask;
            //     });

                // var option = new RewriteOptions();
            // option.AddRedirect("^$", "swagger/ui");
            // app.UseRewriter(option);

        }
    }
}
