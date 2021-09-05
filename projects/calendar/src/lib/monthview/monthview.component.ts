import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit, QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {group} from '@angular/animations';
import {element} from 'protractor';
import {start} from 'repl';

@Component({
  selector: 'sc-monthview',
  templateUrl: './monthview.component.html',
  styleUrls: ['./monthview.component.css']
})
export class MonthviewComponent implements OnInit, AfterViewChecked {

  @Input() weekDaysList;
  @Input() monthMatrix;
  @Input() currentMonth;
  @Input() currentYear;
  @Input() month;
  @Input() year;
  @Input() events;
  @ViewChildren('tableEvent') queryList: QueryList<ElementRef>;
  eventWeekList = [[], [], [], [], [], []];
  weekNumber = 0;
  restEventRest = [];
  constructor() { }

  ngOnInit() {
   }
  ngAfterViewChecked(): void {
    const doc = this.queryList.map(el => el.nativeElement);
    this.events.map(e => {
      const event = Object.create(e);
      if (event.start.getTime() < new Date(this.year, this.month, 1).getTime()
        && event.end.getTime() >= new Date(this.year, this.month, 1).getTime()) {
        event.start = new Date(this.monthMatrix[0][0].dateID * 1);
      }
      if (event.end.getTime() > this.monthMatrix[5][6].dateID) {
        event.end = new Date(this.monthMatrix[5][6].dateID);
      }
      return event;
    }).sort((x, y) => x.start.getTime() > y.start.getTime())
      .filter(event => event.start.getTime() >= this.monthMatrix[0][0].dateID)
      .filter(event => event.start.getTime() <= this.monthMatrix[5][6].dateID)
      .forEach(event => {
      const week = Math.floor((event.start.getTime() - this.monthMatrix[0][0].dateID) / (1000 * 60 * 60 * 24 * 7));
      const col = this.getColspan(event);
      const rest = col.rest / 7 + week >= 6 ? 5 : Math.floor(col.rest / 7) + week;
      let i = week + 1;
      for (; i <= rest; i++) {
          const row = document.createElement('tr');
          const data = document.createElement('td');
          data.setAttribute('colspan',  '7');
          data.textContent = event.label;
          data.style.background = event.color;
          data.style.borderRadius = '30px';
          data.style.color = 'white';
          row.appendChild(data);
          doc[i].appendChild(row);
        }
      if (rest < 5 && col.rest - (i - week - 1) * 7 > 0) {
        const row = document.createElement('tr');
        row.setAttribute('date', event.end.getTime());
        const data = document.createElement('td');
        data.setAttribute('colspan',  `${col.rest - (i - week - 1) * 7}`);
        data.textContent = event.label;
        data.style.background = event.color;
        data.style.borderRadius = '30px';
        data.style.color = 'white';
        row.setAttribute('length', `${col.rest - (i - week - 1) * 7}`);
        row.prepend(data);
        doc[i].appendChild(row);
      }
      let tr = document.createElement('tr');
      const td = document.createElement('td');
      td.setAttribute('colspan', `${col.col}`);
      td.textContent = event.label;
      td.style.background = event.color;
      td.style.borderRadius = '30px';
      td.style.color = 'white';
      for (const el of doc[week].children) {
        if (event.start.getTime() > el.getAttribute('date')) {
         tr = el;
       }
     }
      if (tr.getAttribute('length')) {
        const  length = parseInt(td.getAttribute('colspan'), 10) + parseInt(tr.getAttribute('length'), 10);
        tr.setAttribute('length', length.toString());
      } else {
        tr.setAttribute('length', td.getAttribute('colspan'));
      }
      tr.setAttribute('date', event.end.getTime());
      for (let j = 1; j < event.start.getDay() && tr.getAttribute('length') < '7'; j++ ) {
        if (!tr.children[j]) {
          tr.prepend(document.createElement('td'));
        }
      }
      tr.appendChild(td);
      doc[week].appendChild(tr);
    });
  }

  incrementDate(eventDate: Date, d) {
     const date = new Date(eventDate);
     date.setDate(date.getDate() + d);
     return date;
  }

    getColspan(event) {
    const startDate = event.start;
    const endDate = event.end;
    const dayToMs = 1000 * 60 * 60 * 24;
    const diff = endDate.getTime() - startDate.getTime();
    let c =  Math.round(diff / dayToMs) + 1;
    let r = 0;
    if (c + startDate.getDay() - 1 > 7) {
      r = c - (7 - startDate.getDay() + 1);
      c = 7 - startDate.getDay() + 1 ;
    }
    return {col : c , rest : r};
  }
}
