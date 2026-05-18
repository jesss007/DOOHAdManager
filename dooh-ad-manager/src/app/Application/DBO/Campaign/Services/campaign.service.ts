import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MvCampaignFilter,
  MvCampaign,
  MvCampaignDelete,
  MvCampaignCreate,
} from '../Models/campaign';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../Shared/Models/response-model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private baseUrl = 'https://localhost:7065/api/Campaign';
  constructor(private http: HttpClient) {}

  getCampaign(
    offset: number,
    pageSize: number,
    filter?: MvCampaignFilter,
  ): Observable<ApiResponse<MvGridConfig<MvCampaign>>> {
    return this.http.get<ApiResponse<MvGridConfig<MvCampaign>>>(
      `${this.baseUrl}?Offset=${offset}&PageSize=${pageSize}` +
        `&Filter.TenantId=${filter?.tenantId ?? 1}` +
        `&Filter.CampaignId=${filter?.campaignId ?? ''}` +
        `&Filter.Status=${filter?.status ?? ''}` +
        `&Filter.Search=${filter?.search ?? ''}`,
    );
  }

  deleteCampaign(data: MvCampaignDelete): Observable<ApiResponse<MvCampaign>> {
    return this.http.delete<ApiResponse<MvCampaign>>(
      `${this.baseUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`,
    );
  }

  addCampaign(data: MvCampaignCreate): Observable<ApiResponse<MvCampaign>> {
    return this.http.post<ApiResponse<MvCampaign>>(this.baseUrl, data);
  }

  getCampaignById(id: number): Observable<ApiResponse<MvGridConfig<MvCampaign>>> {
    return this.http.get<ApiResponse<MvGridConfig<MvCampaign>>>(
      `${this.baseUrl}?Offset=0&PageSize=1` +
        `&Filter.TenantId=1` +
        `&Filter.CampaignId=${id}`,
    );
  }
}
