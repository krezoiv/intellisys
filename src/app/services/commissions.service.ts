import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenServiceService } from './middlewares/token-service.service';
import { DataCommisionModel } from '../data/models/data-commissions.model';
import { TotalValueByCommissionType, getLastDataBatchAmount } from '../data/interfaces/commissions.interfaces';

const API_URL = environment.API_URL;


@Injectable({
  providedIn: 'root',
})
export class CommissionsService {
  
  constructor(
    private _tokenSerivice: TokenServiceService,
    private _http: HttpClient
  ) {}

  headers = this._tokenSerivice.headers;

  addNewDataCommission(
    data: DataCommisionModel
  ): Observable<DataCommisionModel> {
    return this._http.post<DataCommisionModel>(
      `${API_URL}/commissionData`,
      data,
      this.headers
    );
  }


  getTotalValueByCommissionType(): Observable<TotalValueByCommissionType[]> {
    return this._http.get<TotalValueByCommissionType[]>(
      `${API_URL}/getTotalValueByCommissionType`,
      this.headers
    );
  }
 

  getLastDataBatchTotalAmount ():Observable<getLastDataBatchAmount[]>{
    return this._http.get<getLastDataBatchAmount[]>(
      `${API_URL}/getLastDataBatchAmount`,
      this.headers
    );
  }
}
