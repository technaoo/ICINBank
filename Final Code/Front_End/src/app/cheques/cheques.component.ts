import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cheques } from '../cheques';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.css']
})
export class ChequesComponent implements OnInit {
userID:any;
Cheques:Cheques;
issued:number=0;
requested:number=0;
declined:number=0;
  constructor(public router:Router,public ss:SigninService) { }

  ngOnInit(): void {
    
    this.userID=sessionStorage.getItem("userID");
    this.ss.checkcheqAcc(this.userID).subscribe(result=>{
      this.Cheques=result;
      this.issued=this.Cheques.issued_Cheques;
      this.requested=this.Cheques.requested_Cheques;
      this.declined=this.Cheques.declined_Cheques;

    }
      ,error=>console.log(error),()=>"Details requested");
  }

  navigate(dest:string){
    this.router.navigate([dest]);
  }

  request(){
    this.ss.requestCheque(this.userID).subscribe(result=>{
      if(result==2){
        alert("Request failed...you can only have one request at a time, please wait till your current request is approved or declined");
      }else if(result==1){
        alert("Request was made...please wait till it gets approved or declined in 1-2 working days");
      }else{
        alert("Oops....an error occured please try again later.")
      }
    },error=>console.log(error),()=>{
      this.ss.checkcheqAcc(this.userID).subscribe(result=>{
        this.Cheques=result;
        this.issued=this.Cheques.issued_Cheques;
        this.requested=this.Cheques.requested_Cheques;
        this.declined=this.Cheques.declined_Cheques;
  
      }
        ,error=>console.log(error),()=>"Details requested");
  
    })
  }

  logout(){
    sessionStorage.removeItem("userID");
    this.router.navigate(["Signin"]);
  }
  
  

}
