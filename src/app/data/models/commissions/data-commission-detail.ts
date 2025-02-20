import { DataCommisionModel } from "../data-commissions.model";
import { CommissionConceptModel } from "./commission-concept.model";
import { CommissionTypeModel } from "./commission-type.model";


export class DataCommissionDetailModel {
    constructor(
       //public idDataDetail : number,
       public reference : string,
       public idDataCommissionConcept : CommissionConceptModel,
       public description : string,
       public value : number,
       public idCommissionType : CommissionTypeModel,
       public idDataBatch : DataCommisionModel
    ){}
}