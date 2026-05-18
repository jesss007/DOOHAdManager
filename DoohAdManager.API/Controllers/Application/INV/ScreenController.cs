using DoohAdManager.API.Controllers.Shared;
using DoohAdManager.Interface.Application.INV;
using DoohAdManager.Model.Application.INV;
using DoohAdManager.Model.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DoohAdManager.API.Controllers.Application.INV
{
    public class ScreenController(IScreenService ss) : SharedController
    {
        [HttpGet]

        public async Task<IActionResult> GetScreen([FromQuery] MvParamReqOption<MvScreenFilter> param)
        {
            try
            {
                var response = await ss.GetScreen(param);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpPost]

        public async Task<IActionResult> AddScreen([FromBody] MvScreenAdd screenAdd)
        {
            try
            {
                var response = await ss.AddScreen(screenAdd);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }


        [HttpPut]

        public async Task<IActionResult> UpdateScreen([FromBody] MvScreenUpdate screenUpdate)
        {
            try
            {
                var response = await ss.UpdateScreen(screenUpdate);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpDelete]

        public async Task<IActionResult> DeleteScreen([FromQuery] MvScreenDelete screenDelete)
        {
            try
            {
                var response = await ss.DeleteScreen(screenDelete);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpGet("Ddl")]

        public async Task<IActionResult> GetScreenDdl([FromQuery] int? campaignId = null)
        {
            try
            {
                var response = await ss.GetScreenDdl(campaignId);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }


    }
}
