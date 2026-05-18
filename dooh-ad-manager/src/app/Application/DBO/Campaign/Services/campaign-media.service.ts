import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MvCampaignFilter } from '../Models/campaign';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../Shared/Models/response-model';
import {
  MvCampaignMedia,
  MvCampaignMediaDelete,
  MvCampaignMediaDeleted,
  MvCampaignMediaFilter,
  MvCampaignMediaAdd,
  MvCampaignMediaUpdate,
} from '../Models/campaign-media';

@Injectable({
  providedIn: 'root',
})
export class CampaignMediaService {
  private baseUrl = 'https://localhost:7065/api/CampaignMedia';
  constructor(private http: HttpClient) {}

  getCampaignMedia(
    offset: number,
    pageSize: number,
    filter?: MvCampaignMediaFilter,
  ): Observable<ApiResponse<MvGridConfig<MvCampaignMedia>>> {
    return this.http.get<ApiResponse<MvGridConfig<MvCampaignMedia>>>(
      `${this.baseUrl}?Offset=${offset}&PageSize=${pageSize}` +
        `&Filter.CampaignId=${filter?.campaignId ?? ''}` +
        `&Filter.ScreenId=${filter?.screenId ?? ''}` +
        `&Filter.PlayDate=${filter?.playDate ?? ''}` +
        `&Filter.Search=${filter?.search ?? ''}`,
    );
  }

  addCampaignMedia(
    data: MvCampaignMediaAdd,
  ): Observable<ApiResponse<MvCampaignMedia>> {
    return this.http.post<ApiResponse<MvCampaignMedia>>(this.baseUrl, data);
  }

  updateCampaignMedia(
    data: MvCampaignMediaUpdate,
  ): Observable<ApiResponse<MvCampaignMedia>> {
    return this.http.put<ApiResponse<MvCampaignMedia>>(this.baseUrl, data);
  }

  deleteCampaignMedia(
    data: MvCampaignMediaDelete,
  ): Observable<ApiResponse<MvCampaignMediaDeleted>> {
    return this.http.delete<ApiResponse<MvCampaignMediaDeleted>>(
      `${this.baseUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`,
    );
  }
}
