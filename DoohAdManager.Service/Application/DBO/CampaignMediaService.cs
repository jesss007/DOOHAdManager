using DoohAdManager.DataAccess;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;
using Newtonsoft.Json;

namespace DoohAdManager.Service.Application.DBO
{
    public class CampaignMediaService(IDataAccessService ds) : ICampaignMediaService
    {

        public async Task<CampaignMedia?> InsertCampaignMedia(CampaignMediaInsert campaignMediaInsert)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignMediaInsert);
                string result = await ds.ActionProcedure("dbo.SpCampaignMediaIns", json);
                return JsonConvert.DeserializeObject<CampaignMedia?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvGridConfig<CampaignMedia>?> GetCampaignMedia(MvParamReqOption<CampaignMediaFilter> param)
        {
            try
            {
                string json = JsonConvert.SerializeObject(param);
                string result = await ds.RetrievalProcedure("dbo.SpCampaignMediaSel", json);
                return JsonConvert.DeserializeObject<MvGridConfig<CampaignMedia>?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<CampaignMedia?> UpdateCampaignMedia(CampaignMediaUpdate campaignMediaUpdate)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignMediaUpdate);
                string result = await ds.ActionProcedure("dbo.SpCampaignMediaUpd", json);
                return JsonConvert.DeserializeObject<CampaignMedia?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<CampaignMediaDeleted?> DeleteCampaignMedia(CampaignMediaDelete campaignMediaDelete)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignMediaDelete);
                string result = await ds.ActionProcedure("dbo.SpCampaignMediaDel", json);
                return JsonConvert.DeserializeObject<CampaignMediaDeleted?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}