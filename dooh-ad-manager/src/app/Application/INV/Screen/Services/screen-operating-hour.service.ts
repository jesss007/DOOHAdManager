import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../Shared/Models/response-model';
import { ScreenOperatingHour, ScreenOperatingHourDelete, ScreenOperatingHourInsert } from '../Models/screen-operating-hour';

@Injectable({
  providedIn: 'root'
})
export class ScreenOperatingHourService {

  private getUrl = 'https://localhost:7065/api/ScreenOperatingHour/Id';
  private baseUrl = 'https://localhost:7065/api/ScreenOperatingHour';

  constructor(private http: HttpClient) {}

  getOperatingHour(screenId: number): Observable<ApiResponse<ScreenOperatingHour[]>> {
    return this.http.get<ApiResponse<ScreenOperatingHour[]>>(
      `${this.getUrl}?id=${screenId}`,
    );
  }

  insertOperatingHour(data: ScreenOperatingHourInsert): Observable<ApiResponse<ScreenOperatingHour>>{
    return this.http.post<ApiResponse<ScreenOperatingHour>>(this.baseUrl, data);
  }

  deleteOperatingHour(data: ScreenOperatingHourDelete): Observable<ApiResponse<ScreenOperatingHour>>{
    return this.http.delete<ApiResponse<ScreenOperatingHour>>(
      `${this.baseUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`,
    );
  }
}
