import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'sc-navmanager',
  templateUrl: './navmanager.component.html',
  styleUrls: ['./navmanager.component.css']
})
export class NavmanagerComponent implements OnInit {
  @Output() changeView = new EventEmitter<any>();
  @Output() todayEmitter = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeToWeek(flag: boolean) {
    this.changeView.emit(flag);
  }

  today() {
    this.todayEmitter.emit(true);
  }

}
