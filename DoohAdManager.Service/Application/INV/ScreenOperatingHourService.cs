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
        public async Task<ScreenOperatingHour?> DeleteScreenOperatingHour(ScreenOperatingHourDelete operatingHourDelete)
        {
            try
            {
                string json = JsonConvert.SerializeObject(operatingHourDelete);
                string result = await ds.ActionProcedure("inv.SpScreenOperatingHourDel", json);
                return JsonConvert.DeserializeObject<ScreenOperatingHour?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<ScreenOperatingHour>?> GetScreenOperatingHour(int screenId)
        {
            try
            {
                string json = JsonConvert.SerializeObject(new { ScreenId = screenId });
                string result = await ds.RetrievalProcedure("inv.SpScreenOperatingHourSel", json);
                return JsonConvert.DeserializeObject<List<ScreenOperatingHour>?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ScreenOperatingHour?> InsertScreenOperatingHour(ScreenOperatingHourInsert operatingHourInsert)
        {
            try
            {
                string json = JsonConvert.SerializeObject(operatingHourInsert);
                string result = await ds.ActionProcedure("inv.SpScreenOperatingHourIns", json);
                return JsonConvert.DeserializeObject<ScreenOperatingHour?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
