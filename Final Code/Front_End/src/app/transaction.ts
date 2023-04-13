import { Time } from "@angular/common";

export class Transaction {

constructor(
    public transaction_id:String,
    public customer_repoid:number,
    public amount:number,
    public type_of_transaction:number,
    public generation_method:number,
    public date:String,
    public time:String,
    public upi_address?:String,
    public card_holder?:String,
    public card_16_digits?:String,

){

}

}
