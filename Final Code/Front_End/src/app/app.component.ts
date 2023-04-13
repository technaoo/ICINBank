import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from './signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ICIN_BANK';
  name:string ="Rasdlfk;";
  constructor(public router:Router,public ss:SigninService){

  }
  ngOnInit(): void {

    this.ss.create_init_Admin().subscribe(result=>{
      if(result==true){
        this.router.navigate(["Signin"])
      }else{
        alert("Something went wron, cannot initiate the website...please contact the bank for any enquiries");
      }
    },error=>console.log(error),()=>console.log("Admin request completed"));
  } 


// navigatesignin(){
//   alert("Wtf");
// this.router.navigate(["userDash"]);
// }
// navigatesignup(){
// this.router.navigate(["Signup"]);
// }






}
