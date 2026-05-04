using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Model.Shared
{
    public static class ApiResponse
    {

        public static ApiResponse<T> Success<T>(T data, string message = "Success")
        {
            return new ApiResponse<T>
            {
                Success = true,
                Message = message,
                Data = data
            };
        }

        public static ApiResponse<object> Fail(string message, object? error = null)
        {
            return new ApiResponse<object>
            {
                Success = false,
                Message = message,
                Error = error
            };
        }

    }
}
