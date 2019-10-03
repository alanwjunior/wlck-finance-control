import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomingRegisterComponent } from './incoming-register/incoming-register.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { MonthlyPlanningComponent } from './monthly-planning/monthly-planning.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'add-incoming', component: IncomingRegisterComponent, canActivate: [AuthGuardService] },
  { path: 'history', component: TransactionsHistoryComponent, canActivate: [AuthGuardService] },
  { path: 'monthly-planning', component: MonthlyPlanningComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
