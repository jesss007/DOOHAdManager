using DoohAdManager.Model.Application.INV;
using DoohAdManager.Model.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Interface.Application.INV
{
    public interface IScreenService
    {
        Task<MvGridConfig<MvScreen>?> GetScreen(MvParamReqOption<MvScreenFilter> param);
        Task<MvScreen?> AddScreen(MvScreenAdd screenAdd);
        Task<MvScreen?> UpdateScreen(MvScreenUpdate screenUpdate);
        Task<MvScreen?> DeleteScreen(MvScreenDelete screenDelete);
        Task<List<MvScreenDropdown>?> GetScreenDdl(int? campaignId = null);

    }

}
