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
        Task<MvScreenOperatingHour?> AddScreenOperatingHour(MvScreenOperatingHourAdd operatingHourAdd);
        Task<List<MvScreenOperatingHour>?> GetScreenOperatingHour(int screenId);
        Task<MvScreenOperatingHour?> DeleteScreenOperatingHour(MvScreenOperatingHourDelete operatingHourDelete);

    }
}
