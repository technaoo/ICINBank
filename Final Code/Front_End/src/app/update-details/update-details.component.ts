import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';
import { User } from '../user';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {

  ch_mail:boolean=false;
  ch_telephone:boolean=false;
  ch_address:boolean=false;
  ch_password:boolean=false;
  re_password:boolean=false;
  password:any;
  special_chr_check:boolean=false;
  length_check:boolean=false;
  uppercase_check:boolean=false;
  lowercase_check:boolean=false;
  number_check:boolean=false;
  msgs:string="";
  msgu:string="";
  msgl:string="";
  msgn:string="";
  msglc:string="";
  
  constructor(public ss:SigninService,public router:Router) { }

  ngOnInit(): void {
    let ref= sessionStorage.getItem("update");


  if(ref=="address"){
    this.ch_address=true;
    this.ch_telephone=false;
    this.ch_mail=false;
    this.ch_password=false
    this.re_password=false;
  }else if(ref=="mail"){
    this.ch_address=false;
    this.ch_telephone=false;
    this.ch_mail=true;
    this.ch_password=false;
    this.re_password=false;


  }else if(ref=="tel"){
    this.ch_address=false;
    this.ch_telephone=true;
    this.ch_mail=false;
    this.ch_password=false;
    this.re_password=false;


  }else{
    this.ch_address=false;
    this.ch_telephone=false;
    this.ch_mail=false;
    this.ch_password=true;
    this.re_password=false;


  }

  }
  addressRef = new FormGroup({
    address_1: new FormControl(),
    address_2: new FormControl(),
    address_3:new FormControl(),
    address_4:new FormControl(),
    state:new FormControl(),
    city:new FormControl(),
    pincode:new FormControl()
   })

   UserRef= new FormGroup({
    customer_repoid: new FormControl(),
    password:new FormControl()
   })

   updateaddress(){
    let ref = this.addressRef.value;
  
    if(ref.address_1==null||ref.pincode==null||ref.city==null||ref.pincode.toString().length!=6){
      alert("Please enter all the valid details to continue");
    }else{
      this.ss.updateaddress(ref,sessionStorage.getItem("userID")).subscribe(result=>{
      if(Number(result)==1){
      alert("Address has been updated");
      }
      this.router.navigate(['profile']);
    },error=>{console.log(error)},()=>{});
    }
   }



  update(dest:number, values:any){
    
    if(dest==1){
      let error_1=false;
      let error_2=false;
      if(values.value==null){
        alert("Please enter your mail ID to continue");
        error_1=true;
      }else{
        error_1=false;
      }
      if(!values.value.includes('@')){
        alert("Please enter a valid mail ID to continue");
        error_2=true;
      }else{
        error_2=false;
      }
      if(error_1==false&& error_2==false){
        this.ss.updatemail(sessionStorage.getItem("userID"),values.value).subscribe(result=>{
        if(result==1){
          alert("Your mail ID was updated");
          this.router.navigate(['profile']);
        }
        },error=>console.log(error),()=>console.log("Update Mail Request Completed"));
      }

    }else if(dest==2){
      let error_1=false;
      let error_2=false;
      if(values.value==null){
        alert("Please enter your mobile phone number to continue");
        error_2=true;
      }else{
        error_1=false;
      }
      if(values.value.length!=10){
        alert("Please enter a correct number to continue with the update process");
        error_2=true;
      }else{
        error_2=false;
      }

      if(error_1==false&& error_2==false){
       this.ss.update_telephone(sessionStorage.getItem("userID"),values.value).subscribe(result=>{

        if(result==1){
          alert("Your Contact Number was updated");
          this.router.navigate(['profile']);
        }else{
          alert("Uh..Oh..an error occured....your contact number was not updated, please try again");
          this.router.navigate(['profile']);
        }
       },error=>console.log(error),()=>console.log("Update Telephone...Request Completed"));
      }

      
    }else{
      this.UserRef.value.customer_repoid=sessionStorage.getItem("userID");
      this.UserRef.value.password=values.value;
      if(values.value==null){
        alert("Please Enter the password to continue");
      }else{

        this.ss.checkUser(this.UserRef.value).subscribe(result=>{
        if(Number(result)==1){
          this.password=values.value;
          this.ch_password=false;
          this.re_password=true;
        }else if(Number(result)==2){
          alert("Wrong Password");
          values.value=null;
        }else{
          alert("Uh..Oh...an error occurd please again later");
        }
        }
          ,error=>console.log(error),()=>console.log("Request for password check completed"));
      }
       


    }

  }

  updatepass(newpass:any,newpass_1:any){
    if(newpass.value==''||newpass_1.value==''){
    alert("Please fill all the fields to continue");
    }
    else{
      if(newpass.value!=newpass_1.value){
    alert("The Passwords do not match...try again");
    newpass.value=null; newpass_1=null;
      }else{
        if(newpass.value==this.password){
          alert("You cannot use a password that has been used before");
        }else{
          if(this.CheckPassword(newpass.value,newpass_1.value)){
        this.ss.update_password(sessionStorage.getItem("userID"),newpass.value).subscribe(result=>{
        if(result==1){
          alert("Your Password has been updated");
          this.router.navigate(['userDash']);

        }else{
          alert("Uh.oh...an error occured...your password was not updated...please try again later");
        }
        },error=>console.log(error),()=>console.log("Update Password Request Complete"));
        }
      }
      }
    
    }

  }


  checkforspecial( value:string){
    let a = "";
    
    let special_chr=[['!'],['"'],['#'],['$'],['%'],['&'],["'"],['('],[')'],['*'],['+'],[','],['-'],['.'],['/'],[':'],[';'],['<'],['='],['>'],['?'],['@'],['['],[']'],['^'],['_'],['`'],['{'],['|'],['}'],['~']];
    for(let i=0;i<special_chr.length;i++){
       a = special_chr[i].toString();
      if(value.includes(a)){
       this.special_chr_check=true;
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

 

  CheckPassword(password:any, re_password:any):any{
     this.length_check=false;
     this.length_check=false;
    this.number_check=false;
   
    if(password!=null||re_password!=null){
    if(password!='' || re_password!=''){
    if(password!=re_password){
         alert("The passwords do not match try again");
    }else{

      if(password.toString().length>=8){
      this.length_check=true;
      }else{
        this.length_check=false;
      }
      this.checkforspecial(password)        
      let pass= password.toString().split('');
      
      console.log("length=>"+pass.length);
      for(let i =0;i<pass.length;i++){
        if(pass[i]==pass[i].toUpperCase()&&pass[i].toLowerCase()!=pass[i]){
         this.uppercase_check=true;
        }
      }

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





      if(this.special_chr_check==false){
        this.msgs="You should add at least one Special Character";
      }else{
        this.msgs="";
      }
      if(this.length_check==false){
        this.msgl="Your password should be at least 8 characters long";
      }else{
        this.msgl="";
      }
      if(this.uppercase_check==false){
        this.msgu="Your password should contain at least one uppercase letter";
      }else{
        this.msgu="";
      }
      if(this.number_check==false){
        this.msgn="Your password should contain at least one number";
      }else{
        this.msgn="";
      }
      if(this.lowercase_check==false){
        this.msglc="Your passwod should contain at least one lower case letter";
      }else{
        this.msglc="";
      }
      if(this.special_chr_check==true&&this.length_check==true&&this.length_check==true&&this.number_check==true){
        return true;
      }else{
        return false;
      }


      


      
    



    }
  }
}else{
  alert("Please enter passwords to continue");
}
}





}
