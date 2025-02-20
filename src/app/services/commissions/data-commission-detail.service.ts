import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenServiceService } from '../middlewares/token-service.service';
import { DataCommissionDetailModel } from 'src/app/data/models/commissions/data-commission-detail';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class DataCommissionDetailService {
  constructor(
    private _tokenSerivice: TokenServiceService,
    private _http: HttpClient
  ) {}

  headers = this._tokenSerivice.headers;

  createDataCommissionDetail(
    commissionDetail: DataCommissionDetailModel
  ): Observable<DataCommissionDetailModel[]> {
    return this._http.post<DataCommissionDetailModel[]>(
      `${API_URL}/dataCommissionDetail`,
      commissionDetail,
      this.headers
    );
  }

  getLastComDataDetails(): Observable<DataCommissionDetailModel[]> {
    return this._http.get<DataCommissionDetailModel[]>(
      `${API_URL}/getLastCommissionDataDetails`,
      this.headers
    );
  }

  getCommisionDetailById(idDataDetail: number) {
    return this._http.post<any>(
      `${API_URL}/getCommissionDetailById`,
      { idDataDetail },
      this.headers
    );
  }

  updateCommissionDetail(
    idDataDetail: number,
    commissionDetailData: DataCommissionDetailModel
  ): Observable<DataCommissionDetailModel[]> {
    return this._http.put<DataCommissionDetailModel[]>(
      `${API_URL}/updateDataCommissionDetail/${idDataDetail}`,
      commissionDetailData,
      this.headers
    );
  }

  deleteCommissionDetail(
    idDataDetail: number
  ): Observable<DataCommissionDetailModel[]> {
    return this._http.delete<DataCommissionDetailModel[]>(
      `${API_URL}/deleteDataCommissionDetail/${idDataDetail}`,
      this.headers
    );
  }
}
