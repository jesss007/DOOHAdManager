using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Model.Application.INV
{
    public class ScreenOperatingHour
    {
        public int Id { get; set; }
        public int ScreenId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public int AvgAudienceCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int? DeletedBy { get; set; }
    }

    public class ScreenOperatingHourInsert
    {
        public int ScreenId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public int AvgAudienceCount { get; set; }
        public int? CreatedBy { get; set; }

    }
    public class ScreenOperatingHourDelete
    {
        public int Id { get; set; }
        public int? DeletedBy { get; set; }
    }

}
