using DoohAdManager.DataAccess;
using DoohAdManager.Interface.Application.INV;
using DoohAdManager.Model.Application.INV;
using DoohAdManager.Model.Shared;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Service.Application.INV
{
    public class ScreenService(IDataAccessService ds) : IScreenService
    {
        public async Task<MvScreen?> DeleteScreen(MvScreenDelete screenDelete)
        {
            try
            {
                string json = JsonConvert.SerializeObject(screenDelete);
                string result = await ds.ActionProcedure("inv.SpScreenDel", json);
                return JsonConvert.DeserializeObject<MvScreen?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvGridConfig<MvScreen>?> GetScreen(MvParamReqOption<MvScreenFilter> param)
        {
            try
            {
                string json = JsonConvert.SerializeObject(param);
                string result = await ds.RetrievalProcedure("inv.SpScreenSel", json);
                return JsonConvert.DeserializeObject<MvGridConfig<MvScreen>?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<MvScreenDropdown>?> GetScreenDdl(int? campaignId = null)
        {
            try
            {
                string json = JsonConvert.SerializeObject(new { CampaignId = campaignId});
                string result = await ds.RetrievalProcedure("inv.SpScreenDdl", json);
                return JsonConvert.DeserializeObject<List<MvScreenDropdown>?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvScreen?> AddScreen(MvScreenAdd screenAdd)
        {
            try
            {
                string json = JsonConvert.SerializeObject(screenAdd);
                string result = await ds.ActionProcedure("inv.SpScreenIns", json);
                return JsonConvert.DeserializeObject<MvScreen?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MvScreen?> UpdateScreen(MvScreenUpdate screenUpdate)
        {
            try
            {
                string json = JsonConvert.SerializeObject(screenUpdate);
                string result = await ds.ActionProcedure("inv.SpScreenUpd", json);
                return JsonConvert.DeserializeObject<MvScreen?>(result);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
