using DoohAdManager.DataAccess;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Service.Application.DBO
{
    public class CampaignService(IDataAccessService ds) : ICampaignService
    {
        public async Task<Campaign?> DeleteCampaign(CampaignDelete campaignDelete)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignDelete);
                string result = await ds.ActionProcedure("dbo.SpCampaignDel", json);
                return JsonConvert.DeserializeObject<Campaign?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvGridConfig<Campaign>?> GetCampaign(MvParamReqOption<CampaignFilter> param)
        {
            try
            {
                string json = JsonConvert.SerializeObject(param);
                string result = await ds.RetrievalProcedure("dbo.SpCampaignSel", json);
                return JsonConvert.DeserializeObject<MvGridConfig<Campaign>?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Campaign?> InsertCampaign(CampaignInsert campaignInsert)
        {
            try
            {
                string json = JsonConvert.SerializeObject(campaignInsert);
                string result = await ds.ActionProcedure("dbo.SpCampaignIns", json);
                return JsonConvert.DeserializeObject<Campaign?>(result);
            }
            catch (Exception)
            {
                throw;
            }

        }

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
    }
}
