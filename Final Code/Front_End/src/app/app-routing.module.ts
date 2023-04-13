import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChequesComponent } from './cheques/cheques.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { DepositComponent } from './deposit/deposit.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninCompComponent } from './signin-comp/signin-comp.component';
import { SignupCompComponent } from './signup-comp/signup-comp.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { WithdrawComponent } from './withdraw/withdraw.component';


const routes: Routes = [
  {path:"Signin",component:SigninCompComponent},
  {path:"Signup",component:SignupCompComponent},
  {path:"userDash",component:UserdashboardComponent},
  {path:"withdraw",component:WithdrawComponent},
  {path:"cheques",component:ChequesComponent},
  {path:"deposit",component:DepositComponent},
  {path:"accounts",component:AccountsComponent},
  {path:"profile",component:ProfileComponent},
  {path:"update",component:UpdateDetailsComponent},
  {path:"adminDash",component:AdminDashboardComponent},
  {path:"transaction",component:TransactionComponent},
  {path:"admincreate",component:CreateAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }