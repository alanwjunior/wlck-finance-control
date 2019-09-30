import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {

  monthlyTransactions = [
    {
      id: 'kosakoskaoska',
      date: new Date(),
      value: 400,
      icon: 'fitness_center',
      establishment: 'Pão de açúcar'
    },
    {
      id: 'kosakoskaoska',
      date: new Date(),
      value: 300,
      icon: 'fitness_center',
      establishment: 'Smart fit'
    },
    {
      id: 'kosakoskaoska',
      date: new Date(),
      value: 200,
      icon: 'fitness_center',
      establishment: 'Uber'
    },
    {
      id: 'kosakoskaoska',
      date: new Date(),
      value: 100,
      icon: 'fitness_center',
      establishment: 'Recibo'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
