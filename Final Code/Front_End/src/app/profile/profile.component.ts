import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:any;
  forename:any;
  surname:any;
  dob:any;
  mail:any;
  telephone:any;
  state:any;
  city:any;
  pincode:any;
  address_1:any;
  address_2:any;
  address_3:any;
  address_4:any;
  ch_telephone:boolean=false;
  ch_address:boolean=false;
  ch_mail:boolean=false;
  constructor(public router:Router,public scroller: ViewportScroller, public ss: SigninService) { }

  ngOnInit(): void {
    this.id=sessionStorage.getItem("userID");
    this.ss.retrieveuserDetails(sessionStorage.getItem("userID")).subscribe(result=>{
      this.forename =result.forename
      this.surname=result.surname;
      this.dob=result.dob;
      this.mail=result.email;
      this.telephone= result.telephone_no;
      this.address_1=result.address_1;
      this.address_2=result.address_2;
      this.address_3=result.address_3;
      this.address_4=result.address_4;
      this.pincode= result.pincode;
      this.state= result.state;
      this.city= result.city;
    },error=>console.log(error),()=>"Request Completed");

    if(this.address_2==""){
      this.address_2=null;
    }
    if(this.address_3==""){
      this.address_3=null;
    }
    if(this.address_4==""){
      this.address_4=null;
    }

  }
  navigate(dest:string){
    this.router.navigate([dest]);
  }
  logout(){
    sessionStorage.removeItem("userID");
    this.router.navigate(["Signin"]);
    console.log(sessionStorage.getItem("userID"));
  }

  updatemail(){
    sessionStorage.setItem("update","mail");
    this.router.navigate(['update']);
  }

  updateaddress(){
    sessionStorage.setItem("update","address");
    this.router.navigate(['update']);
  }

  updatetel(){
    sessionStorage.setItem("update","tel");
    this.router.navigate(['update']);
  }

  updatePassword(){
   sessionStorage.setItem("update","pass");
   this.router.navigate(['update']);
  }
  
  
}
