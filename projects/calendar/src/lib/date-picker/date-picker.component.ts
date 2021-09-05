import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sc-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() currentMonth;
  @Input() currentYear;
  @Input() year;
  @Input() month;
  @Input() monthMatrix;
  @Input() weekNumber;
  @Input() monthList;
  @Output() prevOrNext: EventEmitter<any> = new EventEmitter();
  @Output() weekEmitter: EventEmitter<any> = new EventEmitter();
  @Output() monthEmitter: EventEmitter<any> = new EventEmitter();
  monthView = false;
  constructor() { }

  ngOnInit() {
  }
  changeMonthOrYear(up: boolean) {
    if (!this.monthView) {
      if (up) {
        if (this.month < 11) {
          this.month = this.month + 1;
        } else {
          this.month = 0;
          this.year = this.year + 1;
        }
      } else {
        if (this.month > 0) {
          this.month = this.month - 1;
        } else {
          this.month = 11;
          this.year = this.year - 1;
        }

      }
    } else {
      if (up) {
        this.year = this.year + 1;
      } else {
        this.year = this.year - 1;
      }
    }
    this.prevOrNext.emit({month: this.month, year: this.year});
  }
  emitMonth($event) {
    const id = $event.target.closest('button').id;
    this.monthEmitter.emit(id);
  }
  emitWeek($event) {
     this.weekEmitter.emit($event);
  }
  changeView() {
    this.monthView = !this.monthView;
  }
}
