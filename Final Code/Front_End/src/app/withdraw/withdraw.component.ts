import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
msg:string="";
  constructor(public router:Router,public ss:SigninService) { }

  ngOnInit(): void {
  }

  WithdrawRef = new FormGroup({
     Account_No: new FormControl(),
     Account_Name: new FormControl(),
     amount: new FormControl(),
     ifsc:new FormControl(),
     Bank: new FormControl()
  })


  transferto(dest:string){
    this.router.navigate([dest]);

  }
  navigate(dest:string){
    this.router.navigate([dest]);
  }

  transfer(){
    let ref = this.WithdrawRef.value;
    if(ref.Account_Name==null||ref.Account_No==null||ref.amount==null||ref.ifsc==null||ref.Bank==""){
      alert("Please enter all the details to continue with the transaction");
    }else{
     this.ss.transferMoney(sessionStorage.getItem("userID"),sessionStorage.getItem("acc"),ref.amount,ref.Account_No,ref.Account_Name,"nul").subscribe
     (result=>{
    if(result==1){
      this.WithdrawRef.reset();
      
      this.msg="The money has been transfered";
    }else if(result ==2){
      this.WithdrawRef.reset();
      this.msg="incorrect id account number, transaction failed";
    }else if(result ==3){
      this.WithdrawRef.reset();
      this.msg="You do not have enough funds to proceed with the transaction";
    }
    },error=>{},()=>{})
    }
  }

  logout(){
    sessionStorage.removeItem("userID");
    this.router.navigate(["Signin"]);
  }
  
  
}
