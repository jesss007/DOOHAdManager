using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;

namespace DoohAdManager.Interface.Application.DBO
{
    public interface IMediaLibraryService
    {
        Task<MediaLibrary?> InsertMedia(MediaInsert mediaLibraryInsert);
        Task<MvGridConfig<MediaLibrary>?> GetMedia(MvParamReqOption<MediaFilter> param);
        Task<MediaLibrary?> DeleteMedia(MediaDelete mediaLibraryDelete);

        Task<List<MediaDropdown>?> GetMediaDropdown();
       
    }
}
