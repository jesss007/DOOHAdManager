using DoohAdManager.Model.Application.INV;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Interface.Application.INV
{
    public interface IScreenOperatingHourService
    {
        Task<ScreenOperatingHour?> InsertScreenOperatingHour(ScreenOperatingHourInsert operatingHourInsert);
        Task<List<ScreenOperatingHour>?> GetScreenOperatingHour(int screenId);
        Task<ScreenOperatingHour?> DeleteScreenOperatingHour(ScreenOperatingHourDelete operatingHourDelete);

    }
}
