using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Interface.Application.DBO
{
    public interface ICampaignStatusService
    {
        Task UpdateCampaignStatusAsync(CancellationToken cancellationToken);
    }
}
