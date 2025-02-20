import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenServiceService } from '../middlewares/token-service.service';
import { CommissionConceptModel } from 'src/app/data/models/commissions/commission-concept.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CommissionConceptService {

  constructor(
    private _tokenSerivice: TokenServiceService,
    private _http: HttpClient
  ) { }

  headers = this._tokenSerivice.headers;
  
  getCommissionConceptByCommissionType(idCommissionType: number): Observable<CommissionConceptModel[]>{
    return this._http.get<CommissionConceptModel[]>(`${API_URL}/commisionConcept/${idCommissionType}`, this.headers)
  }


  createCommissionConcept(commissionConcept : CommissionConceptModel): Observable<CommissionConceptModel[]>{
    return this._http.post<CommissionConceptModel[]>(
      `${API_URL}/commissionConcept`,
      commissionConcept,
      this.headers
    );
  }


  getCommissionConceptById(idDataCommissionConcept: number): Observable<CommissionConceptModel[]>{
    return this._http.get<CommissionConceptModel[]>(`${API_URL}/getCommissionConceptById/${idDataCommissionConcept}`, this.headers)
  }

}
