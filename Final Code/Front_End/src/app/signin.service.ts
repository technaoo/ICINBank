import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Cheques } from './cheques';
import { Transaction } from './transaction';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(public http:HttpClient) { }


  checkUser(user:any):Observable<string>{
    
    return this.http.post("http://localhost:9090/user/check/",user,{responseType:'text'});
  }

  checkAdmin(ad:any){
    return this.http.post("http://localhost:9090/admin/check/",ad,{responseType:'text'});
  }

  create_init_Admin(){
    return this.http.post("http://localhost:9090/admin/create_init/",{responseType:'text'});
  } 

  createAdmin(fn:any,sn:any,pass:any,email:any,tel:any){
    return this.http.post("http://localhost:9090/admin/create/"+fn+"/"+sn+"/"+pass+"/"+tel+"/"+email,{responseType:'text'});
  }

  createUser(user:any):Observable<string>{
    return this.http.post("http://localhost:9090/user/create",user,{responseType:"text"});
  }

  retrieveuserDetails(id:any):Observable<User>{
    return this.http.get<User>("http://localhost:9090/user/detail/"+id);
  }

  transferMoney(id:any,acc_type:any,amount:any,acc_number:any,acc_holder_name:any, upi:String){
    console.log("http://localhost:9090/user/transfer/"+id+"/"+acc_type+"/"+amount+"/"+acc_holder_name+"/"+acc_number+"/"+upi);
    return this.http.post("http://localhost:9090/user/transfer/"+id+"/"+acc_type+"/"+amount+"/"+acc_holder_name+"/"+acc_number+"/"+upi,{responseType:'text'});
  }

  registerAcc(id:any){
    return this.http.post("http://localhost:9090/cheques/register/"+id,{responseType:'text'});
  }

  checkcheqAcc(id:number):Observable<Cheques>{
    return this.http.get<Cheques>("http://localhost:9090/cheques/check/"+id);
  }

  requestCheque(id:any){
    return this.http.post("http://localhost:9090/cheques/request/"+id,{responseType:'text'});
  }

  setCheque(id:any,cheqid:any){
    return this.http.post("http://localhost:9090/user/setCheque/"+id+"/"+cheqid,{responseType:'text'});
  }

  deposit(id:number,amount:number,acc:number,acc_name:any,acc_no:any,upi:any){
    return this.http.post("http://localhost:9090/user/deposit/"+id+"/"+amount+"/"+acc+"/"+acc_name+"/"+acc_no+"/"+upi,{responseType:'text'});
  }

  updateaddress(address:any,id:any):Observable<string>{
    return this.http.post("http://localhost:9090/user/updateaddress/"+id,address,{responseType:'text'});
  }

  updatemail(id:any,mail_id:any){
    return this.http.post("http://localhost:9090/user/update_mail/"+id+"/"+mail_id,{responseType:'text'});
  }

  update_telephone(id:any,tel:any){
    return this.http.post("http://localhost:9090/user/update_telephone/"+id+"/"+tel,{responseType:'text'});
  }

  update_password(id:any,pass:any){
    return this.http.post("http://localhost:9090/user/updatepass/"+pass+"/"+id,{responseType:'text'});
  }

  retrieve_pending_requests():Observable<Cheques[]>{
    return this.http.get<Cheques[]>("http://localhost:9090/admin/pendingrequests/");
  }

  approve_decline_cheq_request(id:any,state:any){
    return this.http.post("http://localhost:9090/cheques/issue/"+id+"/"+state,{responseType:'text'});

  }

  block_User(id:any,state:any){
    return this.http.post("http://localhost:9090/user/block/"+id+"/"+state,{responseType:'text'});
  }

  retrieve_user_transactios(id:any):Observable<Transaction[]>{
    return this.http.get<Transaction[]>("http://localhost:9090/transaction/retrieveTransactions/"+id);
  }

}