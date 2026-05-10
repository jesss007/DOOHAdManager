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

        public async Task<IActionResult> InsertCampaignMedia([FromBody] CampaignMediaInsert campaignMediaInsert)
        {
            try
            {
                var response = await cms.InsertCampaignMedia(campaignMediaInsert);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetCampaignMedia([FromQuery] MvParamReqOption<CampaignMediaFilter> param)
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

        public async Task<IActionResult> UpdateCampaignMedia([FromBody] CampaignMediaUpdate campaignMediaUpdate)
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

        public async Task<IActionResult> DeleteCampaignMedia([FromQuery] CampaignMediaDelete campaignMediaDelete)
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