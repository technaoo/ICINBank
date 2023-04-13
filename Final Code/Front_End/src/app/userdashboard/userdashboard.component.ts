import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SigninService } from '../signin.service';
import { User } from '../user';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
ID:any;
iad:number=0;
acc_type:any;
acc:number=0;
balance_1:number=0;
balance_2:number=0;
acc_ype:any;
userID:any;
userDetails:Array<any>;
stfu:any;
forename:string="";
dob:string;

  constructor(public ss:SigninService,public router:Router) {
    // let currentUrl = this.router.url;
    // this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
    // this.router.onSameUrlNavigation='reload';
    // this.router.navigate([currentUrl]);
   }

  ngOnInit(): void {
    this.userID=sessionStorage.getItem("userID")
    this.ss.retrieveuserDetails(this.userID).subscribe(result=>{
      var random:User = result;
      this.balance_1=random.balance_1;
      this.balance_2=random.balance_2;
      console.log(random.telephone_no);
      sessionStorage.setItem("userForename",random.forename);
      sessionStorage.setItem("userSurname",random.surname);
      sessionStorage.setItem("Address_1",random.address_1);
      sessionStorage.setItem("State",random.state);
      sessionStorage.setItem("City",random.city);
      sessionStorage.setItem("Pincode",random.pincode.toString());
      sessionStorage.setItem("userMail",random.email);
      sessionStorage.setItem("UserPassword",random.password);
      sessionStorage.setItem("acc",random.account_type.toString());
      sessionStorage.setItem("user_telephone",random.telephone_no.toString());
      sessionStorage.setItem("userDob",random.dob.toString());
      // this.forename=result.forename;
      // console.log("forename"+result.forename);
      // this.userDetails.push(this.forename);
      // console.log("userDetails=>"+this.userDetails);
      // sessionStorage.setItem("stfu",JSON.stringify(this.userDetails));
      // this.stfu=sessionStorage.getItem("stfu");
      // console.log("User Details=>"+JSON.parse(this.stfu));
      if(random.address_2!=null){
       sessionStorage.setItem("Address_2",random.address_2);
      }else{
        sessionStorage.setItem("Address_2","");
      }
      if(random.address_3!=null){
        sessionStorage.setItem("Address_3",random.address_3);
      }else{
        sessionStorage.setItem("Address_3","");
      }
      if(random.address_4!=null){
        sessionStorage.setItem("Address_4",random.address_4);
      }else{
        sessionStorage.setItem("Address_4","");
      }

      this.acc_ype= random.account_type;
      if(this.balance_1==null){
        this.balance_1=0;
      }
      if(this.balance_2==null){
        this.balance_2=0;
      }
      this.acc= result.account_type;
    },error=>{},()=>{});
  }

transferto(acc_typ:string){
  sessionStorage.setItem("acc",acc_typ);
 this.router.navigate(["withdraw"]);
}

navigate(dest:string){

  if(dest=="cheques"){
  sessionStorage.setItem("userID",this.userID);
  }
  if(dest=="deposit"){
  sessionStorage.setItem("acc",this.acc.toString());
  }
  this.router.navigate([dest]);
}


logout(){
  
  sessionStorage.removeItem("userID");
  this.router.navigate(["Signin"]);
}

}
