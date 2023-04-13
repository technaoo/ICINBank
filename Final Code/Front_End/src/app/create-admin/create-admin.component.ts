import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  length_check:boolean=false;
  uppercase_check:boolean=false;
  special_chr_check:boolean=false;
  number_check:boolean=false;
  lowercase_check:boolean=false;
  a:string="";
  msgs:string="";
  msgl:string="";
  msgn:string="";
  msgu:string="";
  msgls:string="";
  msg:string="";
fn_check=0;
sn_check=0;  
  constructor(public router:Router,public ss:SigninService) { }

  ngOnInit(): void {

  }

  adminref = new FormGroup({
    forename :new FormControl(),
    surname : new FormControl(),
    admin_password: new FormControl(),
    telephone_no: new FormControl(),
    email: new FormControl()
})

CreateAdmin(password:any,re_password:any){

}


repeatindex(value:any){
  let a = value.toString().split('');
  let w=0;
  for(let i=0;i<a.length;i++){
    if(a[i]=='@'){
      w++;
    }
  }

  if(w>1){
    return false;
  }else{
    return true;
  }
  
}


createAdmin(pass:any,re_pass:any){
let ref = this.adminref.value;
let email_check=false;
let tel_check=false;
this.fn_check=0;
this.sn_check=0;

this.checkforspecial(ref.forename); this.checkforspecial(ref.surname);
if(this.fn_check==1||this.sn_check==1){
    alert("The Forename/Surname should not cotain any special characters");
    this.adminref.reset();
   
}else{
if(this.emailcheck(ref.email)!=true&&this.repeatindex(ref.email)==true){
  if(this.checkemaillength(ref.email)){
    email_check=true;
  }else{
    email_check=false;
  }
}else{
  email_check=false;
}

if(ref.telephone_no.toString().length==10){
tel_check=true;
}else{
  tel_check=false;
}
if(ref.email==null||email_check==false||ref.surname==null||tel_check==false){
this.msg="Please enter all valid details to continue";
}else{
  this.msg="";
  if(this.CheckPassword(pass,re_pass)){
    this.adminref.value.admin_password=pass.value;
   this.ss.createAdmin(ref.forename,ref.surname,ref.admin_password,ref.email,ref.telephone_no).subscribe(result=>{
    if(result!=0){
      // this.msg="Admin was create with the ID =>"+result;
      sessionStorage.setItem("message","The New Admin Account was created with the Admin_ID =>"+result)
      this.router.navigate(['adminDash']);
    }else{
      sessionStorage.setItem("message","Nothing new, how's your day going!?");
      alert("The Admin Account was not created, please check the update with the bank");
      this.router.navigate(['adminDash']);
    }
   },
    error=>console.log(error),()=>console.log("Admin accout initialization request completed"));
  }
}
}


}


CheckPassword(password:any,re_password:any):any{

  this.length_check=false;
  this.uppercase_check=false;
  this.lowercase_check=false;
  this.number_check=false;
  
  
  if(password.value!=null||re_password.value!=null){
  if(password.value!='' || re_password.value!=''){
  if(password.value!=re_password.value){
       alert("The passwords do not match try again");
  }else{
    if(password.value.length>=8){
      this.length_check=true;
    }else{
      this.length_check=false;
    }
    this.checkforspecial(password.value);        
    let pass= password.value.toString().split('');
    this.uppercase_check=false;
    for(let i =0;i<pass.length;i++){
      if(pass[i]==pass[i].toUpperCase()&&pass[i].toLowerCase()!=pass[i]){
       this.uppercase_check=true;
      }
    }
    this.lowercase_check=false;
    for(let i =0;i<pass.length;i++){
      if(pass[i]!=pass[i].toUpperCase()&&pass[i].toLowerCase()==pass[i]){
       this.lowercase_check=true;
      }
    }

    

    if(this.Number(pass)==true){
      this.number_check=true;
    }else{
      this.number_check=false;
    }




    let m =0;

    if(this.lowercase_check==false){
      this.msgls="You should have at least one lower case letter";
      m++;
    }else{
      this.msgls="";
    }
    if(this.special_chr_check==false){
      this.msgs="You should add at least one Special Character";
      m++;
    }else{
       this.msgs="";
    }
    if(this.length_check==false){
      this.msgl="Your password should be at least 8 characters long";
      m++;
    }else{
      this.msgl="";
    }
    if(this.uppercase_check==false){
      this.msgu="Your password should contain at least one uppercase letter";
      m++;
    }else{
      this.msgu="";
    }
    if(this.number_check==false){
      this.msgn="Your password should contain at least one number";
      m++;
    }else{
      this.msgn="";
    }
    if(this.special_chr_check==true&&this.length_check==true&&this.uppercase_check==true&&this.number_check==true&&this.lowercase_check==true){
      this.adminref.value.admin_password==password.value;
      return true;
    }else{
      return false;
    }


    // if(m>0){
    //   if(m==1){
    //     this.f1="height:1475px;";
    //   }else if(m==2){
    //     this.f1="height:1500px;";
    //   }else if(m==3){
    //     this.f1="height:1512.5px;";
    //   }else{
    //     this.f1="height:1525px;";
    //   }
    // }

    
  



  }
}
}else{
alert("Please enter passwords to continue");
}
}


checkemaillength(value:any):any{
let a=value.toString().split('');
let length= value.toString().length;
 for(let i=0;i<length;i++){
  if(a[i]=='@'){
    if(i>0){
        if(length-i>=4){
           return true;
        }
    }
  }
  }
 }


checkforspecial( value:string,a?:number){
  this.special_chr_check=false;
  let special_chr=[['!'],['"'],['#'],['$'],['%'],['&'],["'"],['('],[')'],['*'],['+'],[','],['-'],['.'],['/'],[':'],[';'],['<'],['='],['>'],['?'],['@'],['['],[']'],['^'],['_'],['`'],['{'],['|'],['}'],['~']];
  for(let i=0;i<special_chr.length;i++){
     this.a = special_chr[i].toString();
    if(value.includes(this.a)){
     this.special_chr_check=true;
     if(a==1){
      this.fn_check=1;
     }else{
      this.sn_check=1;
     }

    }

  }
 }

 emailcheck( value:string,):any{
  let rep;
  let i =0;
  let special_chr=[['!'],['"'],['#'],['$'],['%'],['&'],["'"],['('],[')'],['*'],['+'],[','],['-'],['/'],[':'],[';'],['<'],['='],['>'],['?'],['['],[']'],['^'],['_'],['`'],['{'],['|'],['}'],['~']];
  for(let i=0;i<special_chr.length;i++){
     this.a = special_chr[i].toString();
    if(value.includes(this.a)){
      if(i==0){
        rep = this.a;
        i++;
      }
      if(rep==this.a){
        return false;
      }

     return true;
    }

  }
 }

 Number(pass:any):any{
   let check = false;
   for(let i =0;i<pass.length;i++){
     let numbers=[['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['0']];
     for(let j=0;j<numbers.length;j++){
       if(pass[i]==numbers[j]){
         check=true;
       }
     }
   }
   return check;
 }

  navigate(dest:string){
    this.router.navigate([dest]);
  }

  logout(){
    sessionStorage.removeItem("adminID");
    this.router.navigate(['Signin']);
  }





}
