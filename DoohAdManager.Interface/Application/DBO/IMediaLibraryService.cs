using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;

namespace DoohAdManager.Interface.Application.DBO
{
    public interface IMediaLibraryService
    {
        Task<MvMediaLibrary?> UploadMedia(MvMediaUpload mediaLibraryUpload);
        Task<MvGridConfig<MvMediaLibrary>?> GetMedia(MvParamReqOption<MvMediaFilter> param);
        Task<MvMediaLibrary?> DeleteMedia(MvMediaDelete mediaLibraryDelete);

        Task<List<MvMediaDropdown>?> GetMediaDropdown();
       
    }
}
