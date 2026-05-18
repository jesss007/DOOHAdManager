using DoohAdManager.Model.Application.INV;
using DoohAdManager.Model.Shared;

namespace DoohAdManager.Model.Application.DBO
{
    public class MvCampaign
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public required string Name { get; set; }
        public int DurationInDays { get; set; }
        public CampaignStatus Status { get; set; }
        public string? Remarks { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? DeletedBy { get; set; }
        public List<MvCampaignDate>? Date { get; set; }
        public List<MvCampaignScreen>? Screen { get; set; }
        public List<MvCampaignMedia>? CampaignMedia { get; set; }
    }

    public class MvCampaignDate
    {
        public int Id { get; set; }
        public int CampaignId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class MvCampaignScreen
    {
        public int Id { get; set; }
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
        public bool ScreenDeleted { get; set; }
        public required string ScreenName { get; set; }
    }

    public class MvCampaignCreate
    {
        public int TenantId { get; set; }
        public required string Name { get; set; }
        public string? Remarks { get; set; }
        public int CreatedBy { get; set; }
        public required List<MvCampaignDateCreate> Date { get; set; }
        public required List<MvCampaignScreenAdd> Screen { get; set; }
    }

    public class MvCampaignDateCreate
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class MvCampaignScreenAdd
    {
        public int ScreenId { get; set; }
    }

    public class MvCampaignUpdate
    {
        public int Id { get; set; }
        public CampaignStatus Status { get; set; }
    }

    public class MvCampaignDelete
    {
        public int Id { get; set; }
        public int DeletedBy { get; set; }
    }

    public class MvCampaignFilter
    {
        public int TenantId { get; set; }
        public int? CampaignId { get; set; }
        public CampaignStatus? Status { get; set; }
        public string? Search { get; set; }
    }
}    