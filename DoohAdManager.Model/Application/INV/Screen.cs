using DoohAdManager.Model.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Model.Application.INV
{
    public class Screen
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string Location { get; set; }
        public string Resolution { get; set; } = "1920x1080";
        public ScreenStatus Status {  get; set; }
        public ScreenOrientation Orientation { get; set; }
        public List<string>? Tag { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? CreatedBy { get; set; }
        public int? UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? DeletedBy { get; set; }

    }

    public class ScreenInsert
    {
        public int TenantId { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string Location { get; set; }
        public ScreenStatus Status { get; set; }
        public string Resolution { get; set; } = "1920x1080";
        public ScreenOrientation Orientation { get; set; }
        public List<string>? Tag { get; set; }
        public int? CreatedBy { get; set; }
    }

    public class ScreenUpdate
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string Location { get; set; }
        public ScreenStatus Status { get; set; }
        public string Resolution { get; set; } = "1920x1080";
        public ScreenOrientation Orientation { get; set; }
        public List<string>? Tag { get; set; }
        public int? UpdatedBy { get; set; }
    }

    public class ScreenDelete
    {
        public int Id { get; set; }
        public int? DeletedBy { get; set; }
    }

    public class ScreenFilter
    {
        public int TenantId { get; set; }
        public string? Search { get; set; }
        public ScreenStatus? Status { get; set; }
        public ScreenOrientation? Orientation { get; set; }
    }

    public class ScreenDropdown
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }


}
