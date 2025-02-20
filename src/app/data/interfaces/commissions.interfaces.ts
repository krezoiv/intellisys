import { CommissionConceptModel } from "../models/commissions/commission-concept.model";
import { CommissionTypeModel } from "../models/commissions/commission-type.model";
import { DataCommisionModel } from "../models/data-commissions.model";
import { MonthsModel } from "../models/months.models";



export interface GetLastCommissionDataDetailsInterface{
    idDataDetail: number,
    reference: string,
    idDataCommissionConcept: CommissionConceptModel,
    description: string,
    value: number,
    idDataBatch: DataCommisionModel,
    idCommissionType: CommissionTypeModel,
    concept: string,
    batchDataDate: DataCommisionModel,
    idMonth: MonthsModel,
    totalAmount: number,
    userName: string
}

export interface TotalValueByCommissionType {
    CommissionType: string;
    TotalValue: number;
  }
  
export interface getLastDataBatchAmount {
    totalAmount: number;
}