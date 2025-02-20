import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenServiceService } from '../middlewares/token-service.service';
import { CommissionTypeModel } from '../../data/models/commissions/commission-type.model';
import { CommissionConceptModel } from 'src/app/data/models/commissions/commission-concept.model';

const API_URL = environment.API_URL;


@Injectable({
  providedIn: 'root'
})
export class CommissionTypeService {

 
  constructor(
    private _tokenSerivice: TokenServiceService,
    private _http: HttpClient
  ) { }

  headers = this._tokenSerivice.headers;

  getCommissionTypes(): Observable<CommissionTypeModel[]>{
    return this._http.get<CommissionTypeModel[]>(`${API_URL}/commissionType`, this.headers)
  }

 
}
