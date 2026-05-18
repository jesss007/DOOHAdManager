using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Model.Application.DBO
{
    public class MvMediaLibrary
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public required string Name { get; set; }
        public required string Url { get; set; }
        public required string Extension { get; set; }
        public int? Duration { get; set; }
        public string? Resolution { get; set; }
        public bool IsVideo { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? CreatedBY { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int DeletedBy { get; set; }
    }

    public class MvMediaUpload
    {
        public int TenantId { get; set; }
        public required string Name { get; set; }
        public string? Url { get; set; }
        public int? Duration { get; set; }
        public string? Extension { get; set; }
        public string? Resolution { get; set; }
        public bool IsVideo { get; set; }
        public int? CreatedBy { get; set; }

    }

    public class MvMediaFilter
    {
        public int TenantId { get; set; }
        public string? Search { get; set; }
        public bool? IsVideo { get; set; }
        public bool? IsDeleted { get; set; }
    }

    public class MvMediaDelete 
    { 
        public int Id { get; set; }
        public int? DeletedBy { get; set; }
    }

    public class MvMediaDropdown
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public bool IsVideo { get; set; }
        public required string Url { get; set; }
    }

}
