using DoohAdManager.Model.Application.DBO;
using Microsoft.AspNetCore.Http;

namespace DoohAdManager.API.Model
{
    public class MvFileUploadParam : MvMediaUpload
    {
        public required IFormFile File { get; set; }
    }
}
