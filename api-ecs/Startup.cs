using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EC_API._Repositories.Interface;
using EC_API._Repositories.Repositories;
using EC_API._Services.Interface;
using EC_API._Services.Services;
using EC_API.Data;
using EC_API.Helpers;
using EC_API.Helpers.AutoMapper;
using EC_API.SignalrHub;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
namespace EC_API
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
            services.AddSignalR();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins(
                    "http://10.4.4.224:1000",
                    "http://10.4.4.224:1001",
                    "http://10.4.4.224:106",
                    "http://10.4.0.76:96",
                    "http://10.4.0.76:1001",
                    "http://10.4.4.92:1000",
                    "http://10.4.0.76:1000") //register for client
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<IoTContext>(options => options.UseMySQL(Configuration.GetConnectionString("IoTConnection")));
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            //Auto Mapper
            services.AddAutoMapper(typeof(Startup));
            services.AddScoped<IMapper>(sp =>
            {
                return new Mapper(AutoMapperConfig.RegisterMappings());
            });
            services.AddSingleton(AutoMapperConfig.RegisterMappings());
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
               {
                   options.RequireHttpsMetadata = false;
                   options.SaveToken = true;
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                           .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                       ValidateIssuer = false,
                       ValidateAudience = false
                   };
               });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Electronic Scale", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                     {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                },
                                Scheme = "oauth2",
                                Name = "Bearer",
                                In = ParameterLocation.Header,

                            },
                            new List<string>()
                    }
                });

            });
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //Repository
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IGlueIngredientRepository, GlueIngredientRepository>();
            services.AddScoped<IGlueRepository, GlueRepository>();
            services.AddScoped<IIngredientRepository, IngredientRepository>();
            services.AddScoped<IMakeGlueRepository, MakeGlueRepository>();
            services.AddScoped<IModelNameRepository, ModelNameRepository>();
            services.AddScoped<IUserDetailRepository, UserDetailRepository>();
            services.AddScoped<IPlanRepository, PlanRepository>();
            services.AddScoped<IPlanDetailRepository, PlanDetailRepository>();
            services.AddScoped<IMapModelRepository, MapModelRepository>();
            services.AddScoped<ILineRepository, LineRepository>();
            services.AddScoped<ISupplierRepository, SupplierRepository>();
            services.AddScoped<IProcessRepository, ProcessRepository>();
            services.AddScoped<IArtProcessRepository, ArtProcessRepository>();
            services.AddScoped<IProcessRepository, ProcessRepository>();
            services.AddScoped<IPartNameRepository, PartNameRepository>();
            services.AddScoped<IPartName2Repository, PartName2Repository>();
            services.AddScoped<IMaterialNameRepository, MaterialNameRepository>();
            services.AddScoped<IArticleNoRepository, ArticleNoRepository>();
            services.AddScoped<IBuildingRepository, BuildingRepository>();
            services.AddScoped<IBuildingUserRepository, BuildingUserRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IModelNoRepository, ModelNoRepository>();
            services.AddScoped<IKindRepository, KindRepository>();
            services.AddScoped<IPartRepository, PartRepository>();
            services.AddScoped<IMaterialRepository, MaterialRepository>();
            services.AddScoped<IModelNoRepository, ModelNoRepository>();
            services.AddScoped<IModelNoRepository, ModelNoRepository>();
            services.AddScoped<IBPFCEstablishRepository, BPFCEstablishRepository>();
            services.AddScoped<IMixingInfoRepository, MixingInfoRepository>();
            services.AddScoped<IMixingRepository, MixingRepository>();
            services.AddScoped<IBuildingGlueRepository, BuildingGlueRepository>();
            services.AddScoped<IIngredientInfoRepository, IngredientInfoRepository>();
            services.AddScoped<IIngredientInfoReportRepository, IngredientInfoReportRepository>();
            services.AddScoped<IBPFCHistoryRepository, BPFCHistoryRepository>();

            //Services
            services.AddScoped<IMixingService, MixingService>();
            services.AddScoped<IGlueIngredientService, GlueIngredientService>();
            services.AddScoped<IGlueService, GlueService>();
            services.AddScoped<IMakeGlueService, MakeGlueService>();
            services.AddScoped<IIngredientService, IngredientService>();
            services.AddScoped<IModelNameService, ModelNameService>();
            services.AddScoped<IUserDetailService, UserDetailService>();
            services.AddScoped<IPlanService, PlanService>();
            services.AddScoped<IMapModelService, MapModelService>();
            services.AddScoped<ILineService, LineService>();
            services.AddScoped<ISupplierService, SupplierService>();
            services.AddScoped<IPartNameService, PartNameService>();
            services.AddScoped<IMaterialNameService, MaterialNameService>();
            services.AddScoped<IPartName2Service, PartName2Service>();
            services.AddScoped<IArticleNoService, ArticleNoService>();
            services.AddScoped<IBuildingService, BuildingService>();
            services.AddScoped<IBuildingUserService, BuildingUserService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IBPFCEstablishService, BPFCEstablishService>();
            services.AddScoped<IModelNoService, ModelNoService>();
            services.AddScoped<IArtProcessService, ArtProcessService>();
            services.AddScoped<IProcessService, ProcessService>();
            services.AddScoped<IKindService, KindService>();
            services.AddScoped<IPartService, PartService>();
            services.AddScoped<IMaterialService, MaterialService>();
            services.AddScoped<IMixingInfoService, MixingInfoService>();

            //extension
            services.AddScoped<IMailExtension, MailExtension>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Electronic Scale");
            });
            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ECHub>("/ec-hub");

            });
        }
    }
}
