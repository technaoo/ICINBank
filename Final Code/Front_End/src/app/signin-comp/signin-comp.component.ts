import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';   
import { Router } from '@angular/router';
import { SigninUser } from '../signin-user';
import { SigninService } from '../signin.service';
import { User } from '../user';

@Component({
  selector: 'app-signin-comp',
  templateUrl: './signin-comp.component.html',
  styleUrls: ['./signin-comp.component.css']
})
export class SigninCompComponent implements OnInit {
  x:number=0;
  y:string="";
  validate:any;
  msg:string="";
  disabled:boolean=false
  f_attempts:number=0;
  no:number=19;
  constructor(public ss:SigninService,public router:Router) { }

  ngOnInit(): void {
  }

  SigninRef = new FormGroup({
      customer_repoid: new FormControl(),
      password: new FormControl(),
      account_type: new FormControl(),
  })

  AdminRef = new FormGroup({
    admin_id: new FormControl(),
    admin_password: new FormControl(),

  })


   Verify(){
    var credentials  = this.SigninRef.value;
    // if(credentials.Username==null||credentials.Password==null||credentials.Type_O_U==null){
    //   this.msg= "Enter all the credentials to continue";
    //   return;
    // }else{
    if(credentials.account_type==1){
      // this.user.customer_repoid=credentials.customer_repoid;
      // this.user.password=credentials.password;
      // this.user.account_type=credentials.account_type;
      this.ss.checkUser(credentials).subscribe(result=> // There;s one over here as well.
        {
          if(Number(result)==1){
            sessionStorage.setItem("userID",credentials.customer_repoid); //there's one over here
            this.router.navigate(["userDash"]);
          }else if(Number(result) ==2){
              if(this.f_attempts>=2){
                this.msg="trial limit reached";
                this.disabled=true;
              }else{
                this.msg="Wrong Password";
                this.f_attempts++;
              }
          }else if(Number(result) ==0){
            if(this.f_attempts>=2){
              this.msg="Trial limit reached";
              this.disabled=true;
            }else{
              this.msg="incorrect credentials";
              alert("shit");
              this.f_attempts++;
            }
          }else if(Number(result)==3){
            alert("Your account is blocked, you are not allowed to access your account, please contact the bank to resolve the issue");
          }
        },     
      error=>console.log(error),()=>console.log("Validation_done1"));
     
     
    }else if(credentials.account_type==2) { 
      this.AdminRef.value.admin_id=credentials.customer_repoid;
      this.AdminRef.value.admin_password=credentials.password;
      this.ss.checkAdmin(this.AdminRef.value).subscribe(result=> 
        {
          if(Number(result)==1){
            sessionStorage.setItem("adminID",credentials.customer_repoid);
            sessionStorage.setItem("message","Nothing new, how's your day!?");
            this.router.navigate(["adminDash"]);
          }else if(Number(result) ==2){
              if(this.f_attempts>=2){
                this.msg="trial limit reached";
                this.disabled=true;
              }else{
                this.msg="Wrong Password";
                this.f_attempts++;
  
              }
          }else if(Number(result) ==0){
            if(this.f_attempts>=2){
              this.msg="Trial limit reached";
              this.disabled=true;
            }else{
              this.msg="incorrect credentials";
              this.f_attempts++;
            }

          }
        },
      
      
      
      
      error=>console.log(error),()=>console.log("Validation_done"));

    }else{
      alert("Select a type of user to continue with the portal");
    }
   }
    // }

   transfer():void{
    this.router.navigate(["Signup"]);
   }

  



}
