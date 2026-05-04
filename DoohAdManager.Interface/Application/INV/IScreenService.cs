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
        Task<MvGridConfig<Screen>> GetScreen(MvParamReqOption<ScreenFilter> param);
        Task<Screen?> InsertScreen(ScreenInsert screenInsert);

        Task<Screen?> UpdateScreen(ScreenUpdate screenUpdate);
        Task<Screen?> DeleteScreen(ScreenDelete screenDelete);
        Task<List<ScreenDropdown>?> GetScreenDdl();

    }

}
