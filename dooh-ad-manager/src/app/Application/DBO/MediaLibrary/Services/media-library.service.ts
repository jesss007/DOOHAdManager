import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaLibrary, MediaFilter, MediaDelete } from '../Models/media-library';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../Shared/Models/response-model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MediaLibraryService {
  private baseUrl = 'https://localhost:7065/api/MediaLibrary';
  constructor(private http: HttpClient) {}

  getMedia(
    offset: number,
    pageSize: number,
    filter?: MediaFilter,
  ): Observable<ApiResponse<MvGridConfig<MediaLibrary>>> {
    return this.http.get<ApiResponse<MvGridConfig<MediaLibrary>>>(
      `${this.baseUrl}?Offset=${offset}&PageSize=${pageSize}` +
        `&Filter.TenantId=${filter?.tenantId}` +
        `&Filter.Search=${filter?.search ?? ''}` +
        `&Filter.IsVideo=${filter?.isVideo ?? ''}`+
        `&Filter.IsDeleted=${filter?.isDeleted ?? ''}`,
    );
  }

  getMediaUrl(url: string): string {
    return `${environment.apiBaseUrl}${url}`;
  }

  uploadMedia(
    file: File,
    name: string,
    isVideo: boolean,
  ): Observable<ApiResponse<MediaLibrary>> {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('Name', name);
    formData.append('IsVideo', isVideo.toString());
    formData.append('TenantId', '1');
    formData.append('CreatedBy', '1');

    return this.http.post<ApiResponse<MediaLibrary>>(
      `${this.baseUrl}`,
      formData,
    );
  }

  deleteMedia(data: MediaDelete): Observable<ApiResponse<MediaLibrary>>{
    return this.http.delete<ApiResponse<MediaLibrary>>(
      `${this.baseUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`,
    );
  }

}