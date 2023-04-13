import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SigninService } from '../signin.service';
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { ParseSourceFile } from '@angular/compiler';

@Component({
  selector: 'app-signup-comp',
  templateUrl: './signup-comp.component.html',
  styleUrls: ['./signup-comp.component.css']
  
})
export class SignupCompComponent implements OnInit {
ensubmit:boolean=true;
shit:string="shit";
pincode:any;
mail:String ="";
tel:any;
tpin:String="";
ttel:String="";
msg:String="* Check Password to enable Submit";
check1:boolean=true;
check2:boolean=true;
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

f1:string="height:1400px;";

  constructor(public ss:SigninService,public router:Router) { }

  ngOnInit(): void {

  }


  PassRef = new FormGroup({
    password: new FormControl(),
    re_password: new FormControl(),
  })

  SignupRef = new FormGroup ({
        forename: new FormControl(),
        surname: new FormControl(),
        email : new FormControl(),
        telephone_no : new FormControl(),
        address_1: new FormControl(),
        address_2: new FormControl(),
        address_3: new FormControl(),
        address_4: new FormControl(),
        account_type:new FormControl(),
        state: new FormControl(),
        pincode: new FormControl(),
        city: new FormControl(),
        password: new FormControl(),
        dob:new FormControl()
        
        

  })

  checkforspecial( value:string){
   let special_chr=[['!'],['"'],['#'],['$'],['%'],['&'],["'"],['('],[')'],['*'],['+'],[','],['-'],['.'],['/'],[':'],[';'],['<'],['='],['>'],['?'],['@'],['['],[']'],['^'],['_'],['`'],['{'],['|'],['}'],['~']];
   for(let i=0;i<special_chr.length;i++){
      this.a = special_chr[i].toString();
     if(value.includes(this.a)){
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


  CheckPassword(){
      let signup=this.PassRef.value;
      if(signup.password!=null||signup.re_password!=null){
      if(signup.password!='' || signup.re_password!=''){
      if(signup.password!=signup.re_password){
           this.msg="* Check Password to enable Submit";
           alert("The passwords do not match try again");
           this.ensubmit=true;
      }else{
        if(signup.password.length>=8){
          this.length_check=true;
        }else{
          this.length_check=false;
        }
        this.checkforspecial(signup.password)        
        let pass= signup.password.toString().split('');
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




        if(this.special_chr_check==true&&this.length_check==true&&this.uppercase_check==true&&this.number_check==true&&this.lowercase_check==true){
          alert("The passwords match, you can continue to submit this form");
          this.ensubmit=false;
          this.msg="";
          this.SignupRef.value.password=signup.password;
        }
        let m =0;
        this.f1="height:1450px;";

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

        if(m>0){
          if(m==1){
            this.f1="height:1475px;";
          }else if(m==2){
            this.f1="height:1500px;";
          }else if(m==3){
            this.f1="height:1512.5px;";
          }else{
            this.f1="height:1525px;";
          }
        }

        
      



      }
    }else{
      this.ensubmit=true;
      this.msg="* Check Password to enable Submit";
    }
  }else{
    alert("Please enter passwords to continue");
  }
  }

  Submit(){
    let ref=this.SignupRef.value;
    this.mail=ref.email;
    this.ttel=ref.telephone_no.toString();
    this.tpin=ref.pincode.toString();
    
    if(ref.forename==null||ref.surname==null||ref.email==null||ref.telephone_no==null||ref.address_1==null||ref.pincode==null||ref.state=="state"||ref.state==null||ref.account_type==null){
    alert("Enter all the credentials to continue");
    this.resetPass();
    this.check1=false;
    } else{
      this.check1=true;
    }

    if(this.tpin.length!=6||!this.mail.includes("@")||this.ttel.length!=10){
    alert("Please check your mail address, phone number and pincode (with the right number of digits for the number and pincode)");
   this.resetPass();
    this.check2=false;
    }else{
      this.check2=true;
    }
    if(this.check1==true&&this.check2==true){
      this.ss.createUser(ref).subscribe(result=>{
        if(Number(result)==0){
          alert("An unknown error occured...please try again after restarting the webpage");
          this.resetPass()

        }else if(Number(result)==2){
              alert("RBI states that you should be above 18 years old to open an account. Come back when you turn 18!!");
              this.resetPass();
        }else{
          this.registerCheque(result);
          
          sessionStorage.setItem("userID",result);
          this.router.navigate(["userDash"]);
          this.resetPass();
        }
      },
      error=>console.log(error),()=>console.log("RequestCompleted"));
    }

  }

  resetPass(){
    this.SignupRef.reset();
    this.PassRef.reset();
    this.msg = "* Check Password to enable Submit";
    this.ensubmit=true;
  }

  registerCheque(id:any){
    this.ss.registerAcc(id).subscribe(result=>{
      this.ss.setCheque(sessionStorage.getItem("userID"),result).subscribe(result=>
        {
          if(result==1){
            console.log("cheq_id added");
          }else{
            console.log("error with adding cheq id");
            alert("Oops...an error occured, we haven't been able to add your registered cheq id to your user database...please verify with the bank to further solve this issue.");
          }
        }
        ,error=>console.log(error),()=>console.log("setCheque"));
      if(result==0){
        alert("Uh..oh...something happened while registering your cheque...don't worry your account has been created, you'll have to reinstantiate the cheque with your nearest bank.")
      }
    }
    ,error=>console.log(error),()=>console.log("registration requested"));

  }



}
