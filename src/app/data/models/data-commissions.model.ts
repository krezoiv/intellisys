import { MonthsModel } from "./months.models";


export class DataCommisionModel {
    constructor(
        //public idDataBatch : number,
        public batchDataDate : string,
        public idMonth : MonthsModel,
        public totalAmount : number,
        public userName : string

    ){
    }
}

