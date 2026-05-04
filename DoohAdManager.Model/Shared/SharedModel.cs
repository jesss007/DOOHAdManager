using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoohAdManager.Model.Shared;

public class MvParamReqOption<T>
{
    public string? SearchText { get; set; }
    public string? Operator { get; set; }
    public int Offset { get; set; }
    public int PageSize { get; set; }
    public string? SortBy { get; set; }
    public string? SortOrder { get; set; }
    public T? Filter { get; set; }
}

public class MvGridConfig<T>
{
    public required List<T> Data { get; set; }
    public required int TotalRows { get; set; }
}

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public T? Data { get; set; }
    public object? Error { get; set; }
}

public class MediaUploadParam
{
    public required IFormFile File { get; set; }
    public bool IsVideo { get; set; }
}

public class MediaUploadResult
{
    public required string FileName { get; set; }
    public required string Url { get; set; }
    public string? Resolution { get; set; }
    public int? Duration {  get; set; }
}

