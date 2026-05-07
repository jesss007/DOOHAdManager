using DoohAdManager.Model.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Model.Application.DBO
{
    public class Campaign
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
        public List<CampaignDate>? Date { get; set; }     
        public List<CampaignScreen>? Screen { get; set; }
    }

    public class CampaignDate
    {
        public int Id { get; set; }
        public int CampaignId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class CampaignScreen
    {
        public int Id { get; set; }
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
    }

    public class CampaignMedia
    {
        public int CampaignId { get; set; }
        public int ScreenId { get; set; }
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
        public int PlaySequence { get; set; }
    }

    public class CampaignInsert
    {
        public int TenantId { get; set; }
        public required string Name { get; set; }
        public string? Remarks { get; set; }
        public int CreatedBy { get; set; }
        public required List<CampaignDateInsert> Date { get; set; }
        public required List<CampaignScreenInsert> Screen { get; set; }

    }

    public class CampaignDateInsert
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class CampaignScreenInsert
    {
        public int ScreenId { get; set; }
    }

    public class CampaignUpdate
    {
        public int Id { get; set; }
        public CampaignStatus Status { get; set; }
    }

    public class CampaignDelete
    {
        public int Id { get; set; }
        public int DeletedBy { get; set; }
    }

    public class CampaignFilter
    {
        public int TenantId { get; set; }
        public int? CampaignId { get; set; }
        public CampaignStatus Status { get; set; }
        public string? Search {  get; set; }

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


}
