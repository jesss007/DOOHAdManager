import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignFilter } from '../Models/campaign';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../Shared/Models/response-model';
import {
  CampaignMedia,
  CampaignMediaDelete,
  CampaignMediaDeleted,
  CampaignMediaFilter,
  CampaignMediaInsert,
  CampaignMediaUpdate,
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
    filter?: CampaignMediaFilter,
  ): Observable<ApiResponse<MvGridConfig<CampaignMedia>>> {
    return this.http.get<ApiResponse<MvGridConfig<CampaignMedia>>>(
      `${this.baseUrl}?Offset=${offset}&PageSize=${pageSize}` +
        `&Filter.CampaignId=${filter?.campaignId ?? ''}` +
        `&Filter.ScreenId=${filter?.screenId ?? ''}` +
        `&Filter.PlayDate=${filter?.playDate ?? ''}` +
        `&Filter.Search=${filter?.search ?? ''}`,
    );
  }

  addCampaignMedia(
    data: CampaignMediaInsert,
  ): Observable<ApiResponse<CampaignMedia>> {
    return this.http.post<ApiResponse<CampaignMedia>>(this.baseUrl, data);
  }

  updateCampaignMedia(
    data: CampaignMediaUpdate,
  ): Observable<ApiResponse<CampaignMedia>> {
    return this.http.put<ApiResponse<CampaignMedia>>(this.baseUrl, data);
  }

  deleteCampaignMedia(
    data: CampaignMediaDelete,
  ): Observable<ApiResponse<CampaignMediaDeleted>> {
    return this.http.delete<ApiResponse<CampaignMediaDeleted>>(
      `${this.baseUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`,
    );
  }
}
