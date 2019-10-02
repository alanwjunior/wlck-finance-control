import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { TransactionService } from '../services/transaction/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incoming-register',
  templateUrl: './incoming-register.component.html',
  styleUrls: ['./incoming-register.component.scss']
})
export class IncomingRegisterComponent implements OnInit {
  transactionType = 1;
  categories = [];

  selectedCategory = null;
  transactionValue = 0;
  transactionEstablishment = '';
  incomingDate = null;

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  async ngOnInit() {
    try {
      const result = await this.categoryService.getCategories();
      this.categories = result;
    } catch {
      console.log('error');
    }
  }

  changeDate(event) {
    this.incomingDate = event.value;
  }

  changeTransactionType(event) {
    this.transactionType = event.value;
  }

  async saveTransaction() {
    const transaction = {
      categoryId: this.selectedCategory,
      date: this.incomingDate,
      establishment: this.transactionEstablishment,
      transactionType: this.transactionType,
      value: this.transactionValue
    };
    if(this.isTransactionValid()){
      await this.transactionService.saveTransaction(transaction); 
      this.router.navigate(['']);
    }
  }

  changeSelectedCategory(event) {
    this.selectedCategory = event.value;
  }

  isTransactionValid() {
    return this.selectedCategory !== null && this.incomingDate !== null && this.transactionEstablishment.length > 0
      && this.transactionType !== null && this.transactionValue !== null && this.transactionValue > 0;
  }
}
