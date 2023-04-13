import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }


  navigate(dest:string){
    this.router.navigate([dest]);
  }
  logout(){
    sessionStorage.removeItem("userID");
    this.router.navigate(["Signin"]);
    console.log(sessionStorage.getItem("userID"));
  }
  
  

}
