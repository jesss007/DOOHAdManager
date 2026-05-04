using DoohAdManager.Interface.Shared;
using DoohAdManager.Model.Shared;
using Xabe.FFmpeg;
using SixLabors.ImageSharp;



namespace DoohAdManager.Service.Shared
{
    public class MediaService(string webRootPath) : IMediaService
    {
        public async Task<MediaUploadResult> UploadAsync(MediaUploadParam param)
        {
            if (param.File == null || param.File.Length == 0)
                throw new InvalidOperationException("File is empty or missing.");

            var extension = Path.GetExtension(param.File.FileName).ToLower();
            var folder = param.IsVideo ? "Media/Videos" : "Media/Images";
            var fileName = $"{Guid.NewGuid()}{extension}";
            var savePath = Path.Combine(webRootPath, folder, fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(savePath)!);
            using (var stream = new FileStream(savePath, FileMode.Create))
            {
                await param.File.CopyToAsync(stream);
            }

            string? resolution = null;
            int? duration = null;
            if (!param.IsVideo)
            {
                using var image = Image.Load(savePath);
                resolution = $"{image.Width}x{image.Height}";
            }
            else
            {
                var mediaInfo = await FFmpeg.GetMediaInfo(savePath);
                var video = mediaInfo.VideoStreams.FirstOrDefault();
                resolution = video != null ? $"{video.Width}x{video.Height}" : null;
                duration = (int)mediaInfo.Duration.TotalSeconds;
            }
           

            return new MediaUploadResult
            {
                FileName = fileName,
                Url = $"/{folder}/{fileName}",
                Resolution = resolution,
                Duration = duration
            };
        }
    }
}
