using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Interface.Application.DBO
{
    public interface ICampaignService
    {
        Task<Campaign?> InsertCampaign(CampaignInsert campaignInsert);
        Task<MvGridConfig<Campaign>?> GetCampaign(MvParamReqOption<CampaignFilter> param);
        Task<Campaign?> DeleteCampaign (CampaignDelete campaignDelete);
    
    }
}
