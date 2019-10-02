import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../services/planning/planning.service';
import * as moment from 'moment';
import { TransactionService } from '../services/transaction/transaction.service';
import { CategoryService } from '../services/category/category.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  actualMonthlyPlanning = null;
  pendingDays = 0;
  transactions = [];
  categories = [];
  totalIncomes = 0;
  totalOutcomes = 0;
  percentageIncomes = 0;
  percentageOutcomes = 0;

  constructor(
    private planningService: PlanningService,
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) { }

  async ngOnInit() {
    const now = new Date();
    const monthlyPlanning = await this.planningService.getMonthlyPlanning(now.getFullYear(), now.getMonth() + 1);
    const categories = await this.categoryService.getCategories();
    this.categories = categories;
    if(monthlyPlanning.length > 0) {
      this.actualMonthlyPlanning = monthlyPlanning[0];
      console.log(this.actualMonthlyPlanning);
      await this.getMonthlyTransactions();
    }
    const actualMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endMonth = moment(actualMonth).add(1, 'months').subtract(1, 'days');
    const endMonthDay = moment(endMonth).date();
    this.pendingDays = endMonthDay - now.getDay();
  }

  async getMonthlyTransactions() {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = now.getMonth() === 11 ? 
      new Date(now.getFullYear() + 1, 1, 1) : 
      new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const transactions = await this.transactionService.getTransactionsByPeriod(startDate, endDate);
    this.transactions = transactions;
    this.transactions.forEach(transaction => {
      const icon = this.categories.find(category => category.id === transaction.categoryId);
      transaction.icon = icon ? icon.icon : '';
    });
    const incomes = this.transactions.filter(transaction => transaction.transactionType === 0);
    const outcomes = this.transactions.filter(transaction => transaction.transactionType === 1);
    this.totalIncomes = this.calcTotalIncomes(incomes);
    this.totalOutcomes = this.calcTotalOutcomes(outcomes);
    this.percentageIncomes = this.actualMonthlyPlanning.plannedIncome === 0 ? 
      0 :
      Math.floor(this.totalIncomes / this.actualMonthlyPlanning.plannedIncome * 100);
    this.percentageOutcomes = this.actualMonthlyPlanning.plannedOutcome == 0? 
      0 :
      Math.floor(this.totalOutcomes / this.actualMonthlyPlanning.plannedOutcome * 100);
  }

  calcTotalIncomes(incomes) {
    if(incomes.length === 0) {
      return 0;
    } else if(incomes.length === 1) {
      return incomes[0].value;
    } else {
      return incomes.reduce((previous, next) => previous.value + next.value);
    }
  }

  calcTotalOutcomes(outcomes) {
    if(outcomes.length === 0) {
      return 0;
    } else if(outcomes.length === 1) {
      return outcomes[0].value;
    } else {
      return outcomes.reduce((previous, next) => previous.value + next.value);
    }
  }

}
