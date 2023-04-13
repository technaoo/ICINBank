export class SigninUser {
    constructor(
        public customer_repoid:Number,
        public account_type:any,
        public password:any
    ){
       this.customer_repoid=0;
       this.account_type=null;
       this.password=null;

    }
}
