import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../services/planning/planning.service';
import { CategoryService } from '../services/category/category.service';
import { TransactionService } from '../services/transaction/transaction.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {

  months = [
    {
      label: 'Janeiro',
      value: 1
    },
    {
      label: 'Fevereiro',
      value: 2
    },
    {
      label: 'Março',
      value: 3
    },
    {
      label: 'Abril',
      value: 4
    },
    {
      label: 'Maio',
      value: 5
    },
    {
      label: 'Junho',
      value: 6
    },
    {
      label: 'Julho',
      value: 7
    },
    {
      label: 'Agosto',
      value: 8
    },
    {
      label: 'Setembro',
      value: 9
    },
    {
      label: 'Outubro',
      value: 10
    },
    {
      label: 'Novembro',
      value: 11
    },
    {
      label: 'Dezembro',
      value: 12
    },
  ];
  
  categories = [];
  monthlyPlannings = [];
  selectedMonthlyPlanning = null;
  monthlyTransactions = [];
  totalIncomes = 0;
  totalOutcomes = 0;
  percentageIncomes = 0;
  percentageOutcomes = 0;

  constructor(
    private planningService: PlanningService,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) { }

  async ngOnInit() {
    const result = await this.planningService.listMonthlyPlanning();
    this.monthlyPlannings = result;
    this.proccessMonthlyPlannings();
    const categories = await this.categoryService.getCategories();
    this.categories = categories;
    await this.processTransactions();
  }

  async processTransactions() {
    this.monthlyTransactions = [];
    if(this.selectedMonthlyPlanning) {
      const startDate = new Date(this.selectedMonthlyPlanning.year, this.selectedMonthlyPlanning.month - 1, 1);
      const endDate = this.selectedMonthlyPlanning.month === 12 ? 
        new Date(this.selectedMonthlyPlanning.year + 1, 1, 1) : 
        new Date(this.selectedMonthlyPlanning.year, this.selectedMonthlyPlanning.month, 1);
      // const endDate = new Date(this.selectedMonthlyPlanning.year, this.selectedMonthlyPlanning.month, 1);
      const transactions = await this.transactionService.getTransactionsByPeriod(startDate, endDate);
      this.monthlyTransactions = transactions;
      const incomes = this.monthlyTransactions.filter(transaction => transaction.transactionType === 0);
      const outcomes = this.monthlyTransactions.filter(transaction => transaction.transactionType === 1);
      this.totalIncomes = this.calcTotalIncomes(incomes);
      this.totalOutcomes = this.calcTotalOutcomes(outcomes);
      this.percentageIncomes = this.selectedMonthlyPlanning.plannedIncome === 0 ? 
        0 :
        Math.floor(this.totalIncomes / this.selectedMonthlyPlanning.plannedIncome * 100);
      this.percentageOutcomes = this.selectedMonthlyPlanning.plannedOutcome == 0? 
        0 :
        Math.floor(this.totalOutcomes / this.selectedMonthlyPlanning.plannedOutcome * 100);
      this.monthlyTransactions.forEach(transaction => {
        const icon = this.categories.find(category => category.id === transaction.categoryId);
        transaction.icon = icon ? icon.icon : '';
      })
    }
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
      return outcomes.map(outcome => outcome.value).reduce((previous, next) => previous + next);
    }
  }

  proccessMonthlyPlannings() {
    this.monthlyPlannings.forEach(planning => {
      const monthLabel = this.months.find(month => month.value === planning.month);
      planning.label = monthLabel.label + ' ' + planning.year;
      planning.date = new Date(planning.year, planning.month - 1, 1);
    });
    this.monthlyPlannings.sort((previous, next) => {
      return previous.date > next.date ? -1 : previous.date < next.date ? 1 : 0;
    });
    this.selectedMonthlyPlanning = this.monthlyPlannings.length > 0 ? this.monthlyPlannings[0] : null;
  }

  async selectMonthlyPlanning(monthlyPlanning) {
    this.selectedMonthlyPlanning = monthlyPlanning;
    await this.processTransactions();
  }
}
