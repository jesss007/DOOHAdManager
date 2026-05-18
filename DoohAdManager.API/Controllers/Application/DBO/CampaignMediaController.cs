using DoohAdManager.API.Controllers.Shared;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DoohAdManager.API.Controllers.Application.DBO
{
    public class CampaignMediaController(ICampaignMediaService cms) : SharedController
    {
        [HttpPost]

        public async Task<IActionResult> AddCampaignMedia([FromBody] MvCampaignMediaAdd campaignMediaAdd)
        {
            try
            {
                var response = await cms.AddCampaignMedia(campaignMediaAdd);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetCampaignMedia([FromQuery] MvParamReqOption<MvCampaignMediaFilter> param)
        {
            try
            {
                var response = await cms.GetCampaignMedia(param);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpPut]

        public async Task<IActionResult> UpdateCampaignMedia([FromBody] MvCampaignMediaUpdate campaignMediaUpdate)
        {
            try
            {
                var response = await cms.UpdateCampaignMedia(campaignMediaUpdate);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpDelete]

        public async Task<IActionResult> DeleteCampaignMedia([FromQuery] MvCampaignMediaDelete campaignMediaDelete)
        {
            try
            {
                var response = await cms.DeleteCampaignMedia(campaignMediaDelete);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

    }
}