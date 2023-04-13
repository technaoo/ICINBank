export class User {
    constructor(
        public customer_repoID:any,
        public forename:string,
        public surname:string,
        public password:string,
        public email:string,
        public telephone_no:number,
        public account_type:number,
        public address_1:string,
        public address_2:string,
        public address_3:string,
        public address_4:string,
        public dob:Date,
        public balance_1:number,
        public balance_2:number,
        public state:string,
        public city:string,
        public pincode:number,

    ){
    this.customer_repoID=customer_repoID;
    this.forename=forename;
    this.surname=surname;
    this.password=password;
    this.email=email;
    this.telephone_no=telephone_no;
    this.account_type=account_type;
    this.address_1=address_1;
    this.address_2=address_2;
    this.address_3=address_3;
    this.address_4=address_4;
    this.dob=dob;
    this.balance_1=balance_1;
    this.balance_2=balance_2;
    this.state=state;
    this.city=city;
    this.pincode=pincode
    }

}
