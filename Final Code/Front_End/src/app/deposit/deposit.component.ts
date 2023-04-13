import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
de:boolean=false;
card:String="";
CVV: String="";
upi:boolean=false;
de_cr:boolean=false;
start:boolean=true;
acc:any;
upi_id:string="";
  constructor(public router:Router,
    public ss:SigninService) { }

  ngOnInit(): void {
    
      this.acc = sessionStorage.getItem("acc");
    console.log("acc=>"+this.acc);
    console.log("acc=>"+sessionStorage.getItem("acc"));
    if(Number(this.acc)==2){
      this.de=false;
    }else{
      this.de=true;
    }
  }

  upiRef= new FormGroup({
    upi_address: new FormControl()
  })

  Deb_Cre_Ref = new FormGroup({
    acc_holder: new FormControl(),
    Card_no: new FormControl(),
    Expiry: new FormControl(),
    CVV: new FormControl()
  })

  depRef = new FormGroup({
   amount : new FormControl(),
   transaction_method: new FormControl(),
   acc_type:new FormControl()
})

  navigate(dest:string){
    this.router.navigate([dest]);
  }
  logout(){
    sessionStorage.removeItem("userID");
    this.router.navigate(["Signin"]);
  }

  add(){
    
 let ref = this.depRef.value;
 if(this.acc==2){
 if(ref.amount==null||ref.amount<=0||ref.transaction_method==null||ref.acc_type==null){
  alert("Please enter a all the credentials(do not leave the amount as '0')");
 }else{
 if(ref.transaction_method==1){
  this.start=false
  this.upi=true;
 }else if(ref.transaction_method==2){
  this.start=false;
  this.de_cr=true;
 }
}
}else{
  if(ref.amount==null||ref.amount<=0||ref.transaction_method==null){
    alert("Please enter all the credentials(do not leave the amount as '0') ");
   }else{
   if(ref.transaction_method==1){
    this.start=false;
    this.upi=true;
   }else if(ref.transaction_method==2){
    this.start=false;
    this.de_cr=true;
   }
  
}
  }
}

  debit(){
    let de_cr= this.Deb_Cre_Ref.value;
    this.card = Number(de_cr.Card_no).toString();
    this.CVV= Number(de_cr.CVV).toString();
    let ref = this.depRef.value;
    if(this.checkforspecial(de_cr.acc_holder)!=true){
    if(this.card==null||Number(this.card)<=0||Number(this.CVV)<=0||this.CVV==null||this.card.length!=16||this.CVV.length!=3||de_cr.Expiry==null||de_cr.acc_holder==null){
     alert("Incorrect/ empty details provided...please check all the details and update the process");
    }else{
    let acc= ref.acc_type;
    if(ref.acc_type==null){
      acc= this.acc;
    }
     this.ss.deposit(Number(sessionStorage.getItem("userID")),ref.amount,acc,de_cr.acc_holder,de_cr.Card_no,"nul").subscribe(result=>
      {
        if(Number(result) ==1){
          alert("The money has been credited");
          this.router.navigate(['userDash']);
        }else {
          alert("Uh..oh...there was something wrong....please try again later!");
          this.router.navigate(['userDash']);
        }
      }
      ,error=>console.log(error),()=>console.log('transaction completed'));
    }
  }else{
    alert("The account holder section cannot include Special Characters");
  }
  }

  checkforspecial( value:string,):any{
    let a;
    let special_chr=[['!'],['"'],['#'],['$'],['%'],['&'],["'"],['('],[')'],['*'],['+'],[','],['-'],['.'],['/'],[':'],[';'],['<'],['='],['>'],['?'],['@'],['['],[']'],['^'],['_'],['`'],['{'],['|'],['}'],['~']];
    for(let i=0;i<special_chr.length;i++){
       a = special_chr[i].toString();
      if(value.includes(a)){
       console.log("a"+a);
          return true;
      }
  
    }
   }
  

  upicheck( value:string,):any{
    let rep;
    let i =0;
    let a;
    let special_chr=[['!'],['"'],['#'],['$'],['%'],['&'],["'"],['('],[')'],['*'],['+'],[','],['-'],['/'],[':'],[';'],['<'],['='],['>'],['?'],['['],[']'],['^'],['_'],['`'],['{'],['|'],['}'],['~']];

    for(let i=0;i<special_chr.length;i++){
       a = special_chr[i].toString();
      if(value.includes(a)){
       return true;
      }
  
    }
   }

   repeatindex(value:any):boolean{
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
  
  

  upi_next(){
    let upi_ref= this.upiRef.value;  
    this.upi_id=upi_ref.upi_address; 
    if(this.upi_id==null||!this.upi_id.includes('@')){
      alert("Incorrect VPA address...make sure you haven't missed any '@' symbols");
    } else{
      if(this.repeatindex(this.upi_id)==false||this.upicheck(this.upi_id)==true){
        alert("Incorect VPA address..make sure you have entered the right UPI ID with the right syntax");
      }
      else{
      
    let ref = this.depRef.value;
    let acc= ref.acc_type;
    
    if(ref.acc_type==null){
      acc= this.acc;
    }

    this.ss.deposit(Number(sessionStorage.getItem("userID")),ref.amount,acc,"nul","0",this.upi_id).subscribe(result=>
     {
       if(Number(result) ==1){
         alert("The money has been credited");
         this.router.navigate(['userDash']);
       }else {

         alert("There was something wrong....come back later!");
         this.router.navigate(['userDash']);
       }
     }
     ,error=>console.log(error),()=>console.log('transaction completed'));
    }
    }


  }
  
  

}
