using DoohAdManager.DataAccess;
using DoohAdManager.Interface.Application.INV;
using DoohAdManager.Model.Application.INV;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Service.Application.INV
{
    public class ScreenOperatingHourService(IDataAccessService ds) : IScreenOperatingHourService
    {
        public async Task<MvScreenOperatingHour?> DeleteScreenOperatingHour(MvScreenOperatingHourDelete operatingHourDelete)
        {
            try
            {
                string json = JsonConvert.SerializeObject(operatingHourDelete);
                string result = await ds.ActionProcedure("inv.SpScreenOperatingHourDel", json);
                return JsonConvert.DeserializeObject<MvScreenOperatingHour?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<MvScreenOperatingHour>?> GetScreenOperatingHour(int screenId)
        {
            try
            {
                string json = JsonConvert.SerializeObject(new { ScreenId = screenId });
                string result = await ds.RetrievalProcedure("inv.SpScreenOperatingHourSel", json);
                return JsonConvert.DeserializeObject<List<MvScreenOperatingHour>?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvScreenOperatingHour?> AddScreenOperatingHour(MvScreenOperatingHourAdd operatingHourAdd)
        {
            try
            {
                string json = JsonConvert.SerializeObject(operatingHourAdd);
                string result = await ds.ActionProcedure("inv.SpScreenOperatingHourIns", json);
                return JsonConvert.DeserializeObject<MvScreenOperatingHour?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
