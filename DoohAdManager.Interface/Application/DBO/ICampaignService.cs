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
        Task<MvCampaign?> CreateCampaign(MvCampaignCreate campaignCreate);
        Task<MvGridConfig<MvCampaign>?> GetCampaign(MvParamReqOption<MvCampaignFilter> param);
        Task<MvCampaign?> DeleteCampaign(MvCampaignDelete campaignDelete);
    
    }
}
