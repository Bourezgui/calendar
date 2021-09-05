import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-application';
  events = [{start: new Date(2021, 8, 1), end: new Date(2021, 8, 8), id: 1, label: 'evenement 1', color: 'pink'}
, {start: new Date(2021, 8, 9), end: new Date(2021, 8, 12), id: 2, label: 'evenement 2', color: 'green'}
 , {start: new Date(2021, 8, 15), end: new Date(2022, 0, 15), id: 3, label: 'evenement 3', color: 'gray'}
];
  search(search) {

      console.log('searched value is', search);
  }
  openDialog($event) {

    console.log($event);

  }
}
