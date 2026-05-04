using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Model.Application.CORE
{
    public class Tenant
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int TenancyCode { get; set; }
        public required string Address { get; set; } 
        public required string Contact { get; set; } 
        public required string Email { get; set; }
        public bool IsActive {  get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DeletedAt { get; set; }
        public int DeletedBy { get; set; }
    }
}
