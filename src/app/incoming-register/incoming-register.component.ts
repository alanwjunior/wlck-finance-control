import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incoming-register',
  templateUrl: './incoming-register.component.html',
  styleUrls: ['./incoming-register.component.scss']
})
export class IncomingRegisterComponent implements OnInit {
  
  transactionType = 1;

  categories = [
    {
      id: 0,
      label: 'Teste'
    },
    {
      id: 1,
      label: 'Teste 2'
    },
    {
      id: 2,
      label: 'Teste 3'
    }
  ];

  incomingDate = null;

  constructor() { }

  ngOnInit() {
  }

  changeDate(event) {
    console.log(event.value);
    this.incomingDate = event.value;
  }

  changeTransactionType(event) {
    this.transactionType = event.value;
  }

}
