import { CommissionTypeModel } from "./commission-type.model";


export class CommissionConceptModel {
    constructor(
        public idDataCommissionConcept: number,
        public concept :string,
        public idCommissionType: CommissionTypeModel
    ){}
}