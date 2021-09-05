import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kb-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() title: string;
  @Input() start: string[];
  @Input() end: string[];
  @Input() color: string;
  @Input() id: string;
  @Output() emit: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {
  }

  emitEventData() {
    this.emit.emit({title: this.title, start: this.start, end: this.end,
                                  color: this.color, id: this.id});
  }

}
