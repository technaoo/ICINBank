import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transaction', 
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
transactions:Array<Transaction>;
view:boolean=true;
  constructor(public router:Router,public ss:SigninService) { }

  ngOnInit(): void {
     this.ss.retrieve_user_transactios(sessionStorage.getItem("userID")).subscribe(result=>{
         if(result!=null){
          this.transactions=result;
         }else{
          this.transactions==null;
          this.view=false;
         }
     },error=>console.log(error),()=>console.log("Transaction Retrieval Request completed"));


  }

  navigate(dest:string){
    this.router.navigate([dest]);
  }

  logout(){
    this.router.navigate(['Signin']);
    sessionStorage.removeItem("userID");
  }
  

}
