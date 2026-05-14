import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CampaignFilter,
  Campaign,
  CampaignDelete,
  CampaignInsert,
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
    filter?: CampaignFilter,
  ): Observable<ApiResponse<MvGridConfig<Campaign>>> {
    return this.http.get<ApiResponse<MvGridConfig<Campaign>>>(
      `${this.baseUrl}?Offset=${offset}&PageSize=${pageSize}` +
        `&Filter.TenantId=${filter?.tenantId ?? 1}` +
        `&Filter.CampaignId=${filter?.campaignId ?? ''}` +
        `&Filter.Status=${filter?.status ?? ''}` +
        `&Filter.Search=${filter?.search ?? ''}`,
    );
  }

  deleteCampaign(data: CampaignDelete): Observable<ApiResponse<Campaign>> {
    return this.http.delete<ApiResponse<Campaign>>(
      `${this.baseUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`,
    );
  }

  addCampaign(data: CampaignInsert): Observable<ApiResponse<Campaign>> {
    return this.http.post<ApiResponse<Campaign>>(this.baseUrl, data);
  }

  getCampaignById(id: number): Observable<ApiResponse<MvGridConfig<Campaign>>> {
    return this.http.get<ApiResponse<MvGridConfig<Campaign>>>(
      `${this.baseUrl}?Offset=0&PageSize=1` +
        `&Filter.TenantId=1` +
        `&Filter.CampaignId=${id}`,
    );
  }
}
