namespace DoohAdManager.Model.Application.DBO
{
    public class CampaignMedia
    {
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
        public string? ScreenName { get; set; }
        public List<MediaItem>? Media { get; set; }
        public DateOnly PlayDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? DeletedBy { get; set; }
    }

    public class MediaItem
    {
        public int Id { get; set; }
        public int MediaId { get; set; }
        public string? MediaName { get; set; }
        public bool MediaType { get; set; }
        public string? MediaUrl { get; set; }
        public int PlaySequence { get; set; }
    }

    public class CampaignMediaInsert
    {
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
        public DateOnly PlayDate { get; set; }
        public int CreatedBy { get; set; }
        public required List<MediaItemInsert> Media { get; set; }
    }

    public class MediaItemInsert
    {
        public int MediaId { get; set; }
        public int PlaySequence { get; set; }
    }

    public class CampaignMediaUpdate
    {
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
        public DateOnly PlayDate { get; set; }
        public int UpdatedBy { get; set; }
        public required List<MediaItemUpdate> Media { get; set; }
    }

    public class MediaItemUpdate
    {
        public int Id { get; set; }
        public int PlaySequence { get; set; }
    }

    public class CampaignMediaFilter
    {
        public int CampaignId { get; set; }
        public int? ScreenId { get; set; }
        public DateOnly? PlayDate { get; set; }
        public string? Search { get; set; }
    }

    public class CampaignMediaDelete
    {
        public int Id { get; set; }
        public int DeletedBy { get; set; }
    }

    public class CampaignMediaDeleted
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