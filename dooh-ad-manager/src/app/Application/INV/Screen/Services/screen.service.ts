import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, MvGridConfig } from '../../../../Shared/Models/response-model';
import { Screen, ScreenDelete, ScreenFilter, ScreenInsert, ScreenUpdate } from '../Models/screen';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private baseUrl = 'https://localhost:7065/api/Screen'

  constructor(private http: HttpClient) { }

  getScreen(
    offset: number,
    pageSize: number,
    filter?: ScreenFilter,
  ): Observable<ApiResponse<MvGridConfig<Screen>>>{
    return this.http.get<ApiResponse<MvGridConfig<Screen>>>(
      `${this.baseUrl}?Offset=${offset}&PageSize=${pageSize}`+
      `&Filter.TenantId=1` +
      `&Filter.Search=${filter?.search ?? ''}` +
      `&Filter.Status=${filter?.status ?? ''}` +
      `&Filter.Orientation=${filter?.orientation ?? ''}`
    );
  }

  addScreen( data: ScreenInsert): Observable<ApiResponse<Screen>>{
    return this.http.post<ApiResponse<Screen>>(this.baseUrl, data);
  }

  updateScreen (data: ScreenUpdate): Observable<ApiResponse<Screen>>{
    return this.http.put<ApiResponse<Screen>>(this.baseUrl, data);
  }

  deleteScreen (data: ScreenDelete): Observable<ApiResponse<Screen>>{
    return this.http.delete<ApiResponse<Screen>>(
      `${this.baseUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`,
    )
  }

  
}
