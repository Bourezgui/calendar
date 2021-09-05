import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sc-weekview',
  templateUrl: './weekview.component.html',
  styleUrls: ['./weekview.component.css']
})
export class WeekviewComponent implements OnInit {
  @Input() currentWeek;
  @Input() weekDaysList;
  constructor() { }

  ngOnInit() {
  }

}
