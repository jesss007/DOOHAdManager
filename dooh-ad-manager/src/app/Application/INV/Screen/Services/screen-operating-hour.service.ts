import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../Shared/Models/response-model';
import { MvScreenOperatingHour, MvScreenOperatingHourDelete, MvScreenOperatingHourAdd } from '../Models/screen-operating-hour';

@Injectable({
  providedIn: 'root'
})
export class ScreenOperatingHourService {

  private getUrl = 'https://localhost:7065/api/ScreenOperatingHour/Id';
  private baseUrl = 'https://localhost:7065/api/ScreenOperatingHour';

  constructor(private http: HttpClient) {}

  getOperatingHour(screenId: number): Observable<ApiResponse<MvScreenOperatingHour[]>> {
    return this.http.get<ApiResponse<MvScreenOperatingHour[]>>(
      `${this.getUrl}?id=${screenId}`,
    );
  }

  insertOperatingHour(data: MvScreenOperatingHourAdd): Observable<ApiResponse<MvScreenOperatingHour>>{
    return this.http.post<ApiResponse<MvScreenOperatingHour>>(this.baseUrl, data);
  }

  deleteOperatingHour(data: MvScreenOperatingHourDelete): Observable<ApiResponse<MvScreenOperatingHour>>{
    return this.http.delete<ApiResponse<MvScreenOperatingHour>>(
      `${this.baseUrl}?Id=${data.id}&DeletedBy=${data.deletedBy}`,
    );
  }
}
