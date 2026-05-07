using DoohAdManager.DataAccess;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Interface.Application.INV;
using DoohAdManager.Interface.Shared;
using DoohAdManager.Service.Application.DBO;
using DoohAdManager.Service.Application.INV;
using DoohAdManager.Service.Shared;


namespace DoohAdManager.API.Middleware
{
    public static class DIContainerMiddleware
    {
        public static IServiceCollection AppCoreServices(this IServiceCollection services, IWebHostEnvironment env)
        {
            services.AddScoped<IDataAccessService, DataAccessService>();
            services.AddScoped<IScreenService, ScreenService>();
            services.AddScoped<IScreenOperatingHourService, ScreenOperatingHourService>();
            services.AddScoped<IMediaLibraryService, MediaLibraryService>();
            services.AddScoped<IMediaService>(provider => new MediaService(env.WebRootPath));
            services.AddScoped<ICampaignService, CampaignService>();


            return services;
        } 

    }
}
