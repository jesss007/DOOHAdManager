using DoohAdManager.Model.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Interface.Shared
{
    public interface IMediaService
    {
        Task<MediaUploadResult> UploadAsync(MediaUploadParam param);
    }
}
