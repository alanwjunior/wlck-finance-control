import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomingRegisterComponent } from './incoming-register/incoming-register.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { MonthlyPlanningComponent } from './monthly-planning/monthly-planning.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-incoming', component: IncomingRegisterComponent },
  { path: 'history', component: TransactionsHistoryComponent },
  { path: 'monthly-planning', component: MonthlyPlanningComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
