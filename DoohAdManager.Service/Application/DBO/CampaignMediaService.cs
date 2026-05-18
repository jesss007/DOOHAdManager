using DoohAdManager.DataAccess;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;
using Newtonsoft.Json;

namespace DoohAdManager.Service.Application.DBO
{
    public class CampaignMediaService(IDataAccessService ds) : ICampaignMediaService
    {

        public async Task<MvCampaignMedia?> AddCampaignMedia(MvCampaignMediaAdd campaignMediaAdd)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignMediaAdd);
                string result = await ds.ActionProcedure("dbo.SpCampaignMediaIns", json);
                return JsonConvert.DeserializeObject<MvCampaignMedia?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvGridConfig<MvCampaignMedia>?> GetCampaignMedia(MvParamReqOption<MvCampaignMediaFilter> param)
        {
            try
            {
                string json = JsonConvert.SerializeObject(param);
                string result = await ds.RetrievalProcedure("dbo.SpCampaignMediaSel", json);
                return JsonConvert.DeserializeObject<MvGridConfig<MvCampaignMedia>?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<MvCampaignMedia?> UpdateCampaignMedia(MvCampaignMediaUpdate campaignMediaUpdate)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignMediaUpdate);
                string result = await ds.ActionProcedure("dbo.SpCampaignMediaUpd", json);
                return JsonConvert.DeserializeObject<MvCampaignMedia?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<MvCampaignMediaDeleted?> DeleteCampaignMedia(MvCampaignMediaDelete campaignMediaDelete)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignMediaDelete);
                string result = await ds.ActionProcedure("dbo.SpCampaignMediaDel", json);
                return JsonConvert.DeserializeObject<MvCampaignMediaDeleted?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}