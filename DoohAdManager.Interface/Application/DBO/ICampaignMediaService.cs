using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;

namespace DoohAdManager.Interface.Application.DBO
{
    public interface ICampaignMediaService
    {
        Task<CampaignMedia?> InsertCampaignMedia(CampaignMediaInsert campaignMediaInsert);
        Task<MvGridConfig<CampaignMedia>?> GetCampaignMedia(MvParamReqOption<CampaignMediaFilter> param);
        Task<CampaignMedia?> UpdateCampaignMedia(CampaignMediaUpdate campaignMediaUpdate);
        Task<CampaignMedia?> DeleteCampaignMedia(CampaignMediaDelete campaignMediaDelete);
    }
}