import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kb-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  @Input() title: string;
  @Output('search') searchEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  search($event) {
    this.searchEvent.emit($event.target.value);
  }
}
