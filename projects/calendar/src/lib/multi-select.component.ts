import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sc-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  @Output('search') searchEvent: EventEmitter<any> = new EventEmitter<any>();
  isWeekView = false;
  weekNumber = 0;
  weekDaysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  currentMonth = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth();
  @Input() events: [];

  monthList = [ 'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octrobre',
    'Nouvembre',
    'Decembre'];

  constructor() {
  }


  search($event) {
    this.searchEvent.emit($event.target.value);
  }
  changeToWeek($event) {
      this.isWeekView = $event;
  }
  changeMonth($event) {
    this.month = $event - 1;
    console.log(this.month);
  }
  setToDay() {
      this.month = this.currentMonth;
      this.year = this.currentYear;
      this.weekNumber = 0;
  }
  changeWeek($event) {
    this.weekNumber = $event;
  }

   get monthMatrix() {
      let year = this.year;
      const month = this.month;
      const today = new Date().getDate();
      const matrix = [];
      const endOfMonth = new Date(year, month + 1, 0).getDate();
      const endOfLastMonth = new Date(year, month, 0).getDate();
      const endOfLastDayOfMonth = new Date(year, month, 0).getDay();
      let week = [];
      if (endOfLastDayOfMonth < 7) {
         for (let i = 0; i < endOfLastDayOfMonth; i++ ) {
           const d = endOfLastMonth - i;
           const m = month > 0 ? month - 1 : 11;
           const y = m < 11 ? year : year - 1;
           week.unshift({dateID : new Date(y, m, d).getTime(),
                              timeline: -1,
                              otherMonth: true, day: d});
         }

      }
      for (let iterator = 1; iterator <= 42 - endOfLastDayOfMonth; iterator++ ) {
        const d = iterator <= endOfMonth ? iterator : iterator - endOfMonth;
        if (week.length <= 7 ) {
          let m = iterator > endOfMonth ? month + 1 : month;
          if (m >= 12) {
              m = 0;
              year = year + 1;
          }
          week.push( {dateID : new Date(year, m, d).getTime(),
                      timeline : iterator - today,
                     otherMonth: iterator > endOfMonth,
                     day : d});
        }
        if (week.length === 7 ) {
          const w = iterator > endOfMonth ? endOfLastMonth + week[6].day - 1 : week[6].day;
          matrix.push(week);
          week = [];
        }
      }
      return matrix;
  }

  weekArray(object: object) {
    const res = Object.keys(object).map(key => this.monthMatrix[key]);
    return res;
  }
  setMonthAndYear($event) {
    this.month = $event.month;
    this.year = $event.year;
  }
  ngOnInit() {
  }
}
