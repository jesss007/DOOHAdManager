using DoohAdManager.API.Controllers.Shared;
using DoohAdManager.Interface.Application.DBO;
using DoohAdManager.Model.Application.DBO;
using DoohAdManager.Model.Application.INV;
using DoohAdManager.Model.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp.ColorSpaces;

namespace DoohAdManager.API.Controllers.Application.DBO
{

    public class CampaignController(ICampaignService cs) : SharedController
    {
        [HttpPost]

        public async Task<IActionResult> CreateCampaign([FromBody] MvCampaignCreate campaignCreate)
        {
            try
            { 
                var response = await cs.CreateCampaign(campaignCreate);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpGet]

        public async Task<IActionResult> GetCampaign([FromQuery] MvParamReqOption<MvCampaignFilter> param)
        {
            try
            {
                var response = await cs.GetCampaign(param);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpDelete]

        public async Task<IActionResult> DeleteCampaign([FromQuery] MvCampaignDelete campaignDelete)
        {
            try
            {
                var response = await cs.DeleteCampaign(campaignDelete);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }        
    }
}
