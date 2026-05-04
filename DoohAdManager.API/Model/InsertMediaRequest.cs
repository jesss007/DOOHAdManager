using DoohAdManager.Model.Application.DBO;

namespace DoohAdManager.API.Model
{
    public class InsertMediaRequest : MediaInsert
    {
        public IFormFile File { get; set; }
    }
}
