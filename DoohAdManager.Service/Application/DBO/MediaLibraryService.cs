using DoohAdManager.DataAccess;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;
using Newtonsoft.Json;

namespace DoohAdManager.Service.Application.DBO
{
    public class MediaLibraryService(IDataAccessService ds) : IMediaLibraryService
    {
        public async Task<MvMediaLibrary?> DeleteMedia(MvMediaDelete mediaLibraryDelete)
        {
            try
            {
                string json = JsonConvert.SerializeObject(mediaLibraryDelete);
                string result = await ds.ActionProcedure("dbo.SpMediaLibraryDel", json);
                return JsonConvert.DeserializeObject<MvMediaLibrary?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvGridConfig<MvMediaLibrary>?> GetMedia(MvParamReqOption<MvMediaFilter> param)
        {
            try
            {
                string json = JsonConvert.SerializeObject(param);
                string result = await ds.RetrievalProcedure("dbo.SpMediaLibrarySel", json);
                return JsonConvert.DeserializeObject<MvGridConfig<MvMediaLibrary>?>(result);
            }
            catch(Exception)
            {
                throw;
            }
        }

        public async Task<MvMediaLibrary?> UploadMedia(MvMediaUpload mediaUpload)
        {
            try
            {
                string json = JsonConvert.SerializeObject(mediaUpload);
                string result = await ds.ActionProcedure("dbo.SpMediaLibraryIns", json);
                return JsonConvert.DeserializeObject<MvMediaLibrary?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<MvMediaDropdown>?> GetMediaDropdown()
        {
            try
            {
                string json = JsonConvert.SerializeObject(new { });
                string result = await ds.RetrievalProcedure("dbo.SpMediaLibraryDdl", json);
                return JsonConvert.DeserializeObject<List<MvMediaDropdown>?>(result);
            }
            catch(Exception)
            {
                throw;
            }
        }
    }
}
