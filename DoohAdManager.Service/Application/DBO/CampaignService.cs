using DoohAdManager.DataAccess;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;
using Newtonsoft.Json;

namespace DoohAdManager.Service.Application.DBO
{
    public class CampaignService(IDataAccessService ds) : ICampaignService
    {
        public async Task<MvCampaign?> DeleteCampaign(MvCampaignDelete campaignDelete)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignDelete);
                string result = await ds.ActionProcedure("dbo.SpCampaignDel", json);
                return JsonConvert.DeserializeObject<MvCampaign?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvGridConfig<MvCampaign>?> GetCampaign(MvParamReqOption<MvCampaignFilter> param)
        {
            try
            {
                string json = JsonConvert.SerializeObject(param);
                string result = await ds.RetrievalProcedure("dbo.SpCampaignSel", json);
                return JsonConvert.DeserializeObject<MvGridConfig<MvCampaign>?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

    
        public async Task<MvCampaign?> CreateCampaign(MvCampaignCreate campaignCreate)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignCreate);
                string result = await ds.ActionProcedure("dbo.SpCampaignIns", json);
                return JsonConvert.DeserializeObject<MvCampaign?>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }       
    }
}
