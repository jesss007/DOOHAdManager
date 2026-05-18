namespace DoohAdManager.Model.Application.DBO
{
    public class MvCampaignMedia
    {
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
        public string? ScreenName { get; set; }
        public List<MvMediaItem>? Media { get; set; }
        public DateOnly PlayDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? DeletedBy { get; set; }
    }

    public class MvMediaItem
    {
        public int Id { get; set; }
        public int MediaId { get; set; }
        public string? MediaName { get; set; }
        public bool MediaType { get; set; }
        public string? MediaUrl { get; set; }
        public int PlaySequence { get; set; }
    }

    public class MvCampaignMediaAdd
    {
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
        public DateOnly PlayDate { get; set; }
        public int CreatedBy { get; set; }
        public required List<MvMediaItemAdd> Media { get; set; }
    }

    public class MvMediaItemAdd
    {
        public int MediaId { get; set; }
        public int PlaySequence { get; set; }
    }

    public class MvCampaignMediaUpdate
    {
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
        public DateOnly PlayDate { get; set; }
        public int UpdatedBy { get; set; }
        public required List<MvMediaItemUpdate> Media { get; set; }
    }

    public class MvMediaItemUpdate
    {
        public int Id { get; set; }
        public int PlaySequence { get; set; }
    }

    public class MvCampaignMediaFilter
    {
        public int CampaignId { get; set; }
        public int? ScreenId { get; set; }
        public DateOnly? PlayDate { get; set; }
        public string? Search { get; set; }
    }

    public class MvCampaignMediaDelete
    {
        public int Id { get; set; }
        public int DeletedBy { get; set; }
    }

    public class MvCampaignMediaDeleted
    {
        public int Id { get; set; }
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
        public int MediaId { get; set; }
        public DateOnly PlayDate { get; set; }
        public int PlaySequence { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? DeletedBy { get; set; }
    }
}