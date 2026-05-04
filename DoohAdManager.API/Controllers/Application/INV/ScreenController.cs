using DoohAdManager.API.Controllers.Shared;
using DoohAdManager.Interface.Application.INV;
using DoohAdManager.Model.Application.INV;
using DoohAdManager.Model.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoohAdManager.API.Controllers.Application.INV
{
    public class ScreenController (IScreenService ss): SharedController
    {
        [HttpGet]

        public async Task<IActionResult> GetScreen([FromQuery] MvParamReqOption<ScreenFilter> param)
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

        public async Task<IActionResult> InsertScreen([FromBody] ScreenInsert screenInsert)
        {
            try
            {
                var response = await ss.InsertScreen(screenInsert);
                return Ok(ApiResponse.Success(response));
            }
            catch(Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }


        [HttpPut]

        public async Task<IActionResult> UpdateScreen([FromBody] ScreenUpdate screenUpdate)
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

        public async Task<IActionResult> DeleteScreen([FromQuery] ScreenDelete screenDelete)
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

        public async Task<IActionResult> GetScreenDdl()
        {
            try
            {
                var response = await ss.GetScreenDdl();
                return Ok(ApiResponse.Success(response));
            }
            catch(Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

    }
}
