import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../Shared/Models/response-model';
import {
  MvScreen,
  MvScreenDelete,
  MvScreenDropdown,
  MvScreenFilter,
  MvScreenAdd,
  MvScreenUpdate,
} from '../Models/screen';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private baseUrl = 'https://localhost:7065/api/Screen';

  constructor(private http: HttpClient) {}

  getScreen(
    offset: number,
    pageSize: number,
    filter?: MvScreenFilter,
  ): Observable<ApiResponse<MvGridConfig<MvScreen>>> {
    return this.http.get<ApiResponse<MvGridConfig<MvScreen>>>(
      `${this.baseUrl}?Offset=${offset}&PageSize=${pageSize}` +
        `&Filter.TenantId=1` +
        `&Filter.Id=${filter?.id ?? ''}` +
        `&Filter.Search=${filter?.search ?? ''}` +
        `&Filter.Status=${filter?.status ?? ''}` +
        `&Filter.Orientation=${filter?.orientation ?? ''}`,
    );
  }

  getScreenDdl(campaignId? : number):Observable<ApiResponse<MvScreenDropdown[]>> {
    return this.http.get<ApiResponse<MvScreenDropdown[]>>(`${this.baseUrl}/Ddl`+
      (campaignId ? `?CampaignId=${campaignId}` : '')
    );
  }

  getScreenById(id: number): Observable<ApiResponse<MvGridConfig<MvScreen>>> {
    return this.http.get<ApiResponse<MvGridConfig<MvScreen>>>(
      `${this.baseUrl}?Offset=0&PageSize=1` +
      `&Filter.TenantId=1`+
      `&Filter.Id=${id}`
    );
  }

  addScreen(data: MvScreenAdd): Observable<ApiResponse<MvScreen>> {
    return this.http.post<ApiResponse<MvScreen>>(this.baseUrl, data);
  }

  updateScreen(data: MvScreenUpdate): Observable<ApiResponse<MvScreen>> {
    return this.http.put<ApiResponse<MvScreen>>(this.baseUrl, data);
  }

  deleteScreen(data: MvScreenDelete): Observable<ApiResponse<MvScreen>> {
    return this.http.delete<ApiResponse<MvScreen>>(
      `${this.baseUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`,
    );
  }
}
