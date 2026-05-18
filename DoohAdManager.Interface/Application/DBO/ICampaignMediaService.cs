using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;

namespace DoohAdManager.Interface.Application.DBO
{
    public interface ICampaignMediaService
    {
        Task<MvCampaignMedia?> AddCampaignMedia(MvCampaignMediaAdd campaignMediaAdd);
        Task<MvGridConfig<MvCampaignMedia>?> GetCampaignMedia(MvParamReqOption<MvCampaignMediaFilter> param);
        Task<MvCampaignMedia?> UpdateCampaignMedia(MvCampaignMediaUpdate campaignMediaUpdate);
        Task<MvCampaignMediaDeleted?> DeleteCampaignMedia(MvCampaignMediaDelete campaignMediaDelete);
    }
}