import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { PlanningService } from '../services/planning/planning.service';
const moment = _rollupMoment || _moment;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-monthly-planning',
  templateUrl: './monthly-planning.component.html',
  styleUrls: ['./monthly-planning.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MonthlyPlanningComponent implements OnInit {

  date = new FormControl(moment());
  plannedMonth = null;
  plannedYear = null;

  planning = null;

  constructor(
    private planningService: PlanningService
  ) { }

  async ngOnInit() {
    const today = new Date();
    const result = await this.planningService.getMonthlyPlanning(today.getFullYear(), today.getMonth() + 1);
    if(result.length > 0 ){
      this.planning = result[0];
    } else {
      this.planning = {
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        plannedIncome: 0,
        plannedOutcome: 0
      }
    }
  }

  proccessPlanning(result, year, month) {
    if(result.length > 0 ){
      this.planning = result[0];
    } else {
      this.planning = {
        month: month,
        year: year,
        plannedIncome: 0,
        plannedOutcome: 0
      }
    }
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.plannedYear = normalizedYear.year();
    this.date.setValue(ctrlValue);
  }

  async chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.plannedMonth = normalizedMonth.month() + 1;
    this.date.setValue(ctrlValue);
    datepicker.close();
    await this.filter();
  }

  async saveMonthlyPlanning() {
    await this.planningService.saveMonthlyPlanning(this.planning);
  }

  async filter() {
    const result = await this.planningService.getMonthlyPlanning(this.plannedYear, this.plannedMonth);
    this.proccessPlanning(result, this.plannedYear, this.plannedMonth);
  }

}
