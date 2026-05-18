using DoohAdManager.API.Controllers.Shared;
using DoohAdManager.Interface.Application.INV;
using DoohAdManager.Model.Application.INV;
using DoohAdManager.Model.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoohAdManager.API.Controllers.Application.INV
{
   
    public class ScreenOperatingHourController(IScreenOperatingHourService os) : SharedController
    {
        [HttpPost]

        public async Task<IActionResult> AddScreenOperatingHour([FromBody] MvScreenOperatingHourAdd screenOperatingHourAdd)
        {
            try
            {
                var response = await os.AddScreenOperatingHour(screenOperatingHourAdd);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpGet("Id")]

        public async Task<IActionResult> GetScreenOperatingHour(int id)
        {
            try
            {
                var response = await os.GetScreenOperatingHour(id);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteScreenOperatingHour([FromQuery] MvScreenOperatingHourDelete operatingHourDelete)
        {
            try
            {
                var response = await os.DeleteScreenOperatingHour(operatingHourDelete);
                return Ok(ApiResponse.Success(response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.Fail(ex.Message));
            }
        }


    }
}
