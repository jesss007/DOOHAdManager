using DoohAdManager.DataAccess;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Service.Application.DBO
{
    public class MediaLibraryService(IDataAccessService ds) : IMediaLibraryService
    {
        public async Task<MediaLibrary?> DeleteMedia(MediaDelete mediaLibraryDelete)
        {
            try
            {
                string json = JsonConvert.SerializeObject(mediaLibraryDelete);
                string result = await ds.ActionProcedure("dbo.SpMediaLibraryDel", json);
                return JsonConvert.DeserializeObject<MediaLibrary?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvGridConfig<MediaLibrary>?> GetMedia(MvParamReqOption<MediaFilter> param)
        {
            try
            {
                string json = JsonConvert.SerializeObject(param);
                string result = await ds.RetrievalProcedure("dbo.SpMediaLibrarySel", json);
                return JsonConvert.DeserializeObject<MvGridConfig<MediaLibrary>?>(result);
            }
            catch(Exception)
            {
                throw;
            }
        }

        public async Task<MediaLibrary?> InsertMedia(MediaInsert mediaInsert)
        {
            try
            {
                string json = JsonConvert.SerializeObject(mediaInsert);
                string result = await ds.ActionProcedure("dbo.SpMediaLibraryIns", json);
                return JsonConvert.DeserializeObject<MediaLibrary?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<MediaDropdown>?> GetMediaDropdown()
        {
            try
            {
                string json = JsonConvert.SerializeObject(new { });
                string result = await ds.RetrievalProcedure("dbo.SpMediaLibraryDdl", json);
                return JsonConvert.DeserializeObject<List<MediaDropdown>?>(result);
            }
            catch(Exception)
            {
                throw;
            }
        }
    }
}
