using DoohAdManager.API.Controllers.Shared;
using DoohAdManager.API.Model;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Interface.Shared;
using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DoohAdManager.API.Controllers.Application.DBO
{
   
    public class MediaLibraryController (IMediaLibraryService ms, IMediaService mediaService): SharedController
    {
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadMedia([FromForm] MvFileUploadParam request)
        {
            try 
            {
                var uploadResult = await mediaService.UploadAsync(new MediaUploadParam
                {
                    File = request.File,
                    IsVideo = request.IsVideo
                });

                request.Url = uploadResult.Url;
                request.Extension = Path.GetExtension(request.File.FileName).TrimStart('.').ToLower();
                request.Resolution = uploadResult.Resolution;
                request.Duration = uploadResult.Duration;

                var response = await ms.UploadMedia(request);
                return Ok(ApiResponse.Success(response));
            }
            catch(Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpGet]

        public async Task<IActionResult> GetMedia([FromQuery] MvParamReqOption<MvMediaFilter> param)
        {
            try
            {
                var response = await ms.GetMedia(param);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteMedia([FromQuery] MvMediaDelete mediaDelete)
        {
            try
            {
                var response = await ms.DeleteMedia(mediaDelete);
                return Ok(ApiResponse.Success(response));
            }
            catch(Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpGet("Ddl")]
        public async Task<IActionResult> GetMediaDropdown ()
        {
            try
            {
                var response = await ms.GetMediaDropdown();
                return Ok(ApiResponse.Success(response));
            }
            catch(Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }


    }
}
