import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninCompComponent } from './signin-comp/signin-comp.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupCompComponent } from './signup-comp/signup-comp.component';
import { DatePipe } from '@angular/common';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { RouterModule } from '@angular/router';
import { ChequesComponent } from './cheques/cheques.component';
import { DepositComponent } from './deposit/deposit.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninCompComponent,
    SignupCompComponent,
    UserdashboardComponent,
    WithdrawComponent,
    ChequesComponent,
    DepositComponent,
    AccountsComponent,
    ProfileComponent,
    UpdateDetailsComponent,
    AdminDashboardComponent,
    TransactionComponent,
    CreateAdminComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,HttpClientModule,DatePipe
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
