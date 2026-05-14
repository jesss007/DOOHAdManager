using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Model.Shared
{
    public enum ScreenStatus
    {
        Inactive = 0,
        Active = 1,
        UnderMaintenance = 2
    }

    public enum ScreenOrientation
    {
        Landscape = 1,
        Portrait = 2,
        Square = 3
    }

    public enum DayOfWeek
    {
        Everyday = 0,
        Sunday = 1,
        Monday = 2,
        Tuesday = 3,
        Wednesday = 4,
        Thursday = 5,
        Friday = 6,
        Saturday = 7

    }

    public enum CampaignStatus
    {
        New = 0, 
        Active = 1, 
        Paused = 2, 
        Completed = 3, 
        Cancelled = 4
    }

  
}
