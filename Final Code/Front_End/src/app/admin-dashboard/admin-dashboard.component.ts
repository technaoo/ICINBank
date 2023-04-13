import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cheques } from '../cheques';
import { SigninService } from '../signin.service';
import { User } from '../user';
import { ViewCheques } from '../view-cheques';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
Cheques:ViewCheques[]=[];
view_request:boolean=false;
result:number[]=[];
disable_btn:boolean=false;
newmsg:any=sessionStorage.getItem("message");

view_name="View Cheque Requests";
  constructor(public router:Router,public ss:SigninService) { }

  ngOnInit(): void {
    
    sessionStorage.getItem("adminID");
    this.ss.retrieve_pending_requests().subscribe(result=>{
       if(result!=null){
        this.Cheques=result;
        
         for(let a=0; a<result.length;a++){
           this.Cheques[a].index=Number(a);
         }
 
       }else{
        this.disable_btn=true;
       } 
    },
      error=>console.log(error),()=>{

      }); 
  

  }

  navigate(dest:any){
   this.router.navigate([dest]);
  }

  logout(){
    sessionStorage.removeItem("adminID");
    this.router.navigate(['Signin']);
  }

  loadCheques(){

    this.ss.retrieve_pending_requests().subscribe(result=>{
      if(result!=null){
       this.Cheques=result;
       
        for(let a=0; a<result.length;a++){
          this.Cheques[a].index=Number(a);
        }

      }else{
        this.view_requests();
        this.disable_btn=true;
        this.Cheques.length=0;
        
      } 
   },
     error=>console.log(error),()=>{ 
        
     }); 

    
  }

  view_requests(){
    if(this.view_request==false){
    this.view_request=true;
    this.view_name="Hide Cheque Requests";
    }else{
      this.view_request=false;
      this.view_name="View Cheque Requests"
    }
  }

  approve_requests(index:any,state:any){

      let cheque_id = this.Cheques[index].cheque_id;
      let customer_id= this.Cheques[index].customer_repoID;
         
      this.ss.approve_decline_cheq_request(cheque_id,state).subscribe(result=>{
        if(Number(result)==1){
          if(state==1){
         alert("Cheque request for Customer id=> '"+customer_id+"' approved");
          }else{
            alert("Cheque request for Customer id=> '"+customer_id+"' declined");
          }
         this.loadCheques();

        }
      },error=>console.log(error),()=>{
      });



  }

  block_unblockUser(id:any,dest:number){
    
    if(confirm("Are you sure you want to continue?")){

    if(id.value==null||id.value==''){
      alert("Please enter a Customer ID to continue...");
    }else{
      this.ss.block_User(id.value,dest).subscribe(result=>{
        if(dest==1){
        if(result==1){
        alert("The User has been blocked");
        }else if(result==2){
        alert("The user account is already blocked, cannot block it again");
        }else{
          alert("Uh..oh, an error occured please try again");
        }
      }else{
        if(result==1){
          alert("The User has been un-blocked");
          }else if(result==2){
          alert("The user account is already un-blocked, cannot un-block it again");
          }else{
            alert("Uh..oh, an error occured please try again");
          }
      }
      },
        error=>console.log(error),()=>console.log("Block-Unblock"));
    }

    
  }
  }

}
