import { NgModule } from '@angular/core';
import { MultiSelectComponent } from './multi-select.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event/event.component';
import { SubstrPipe } from './utils/pipes/substr/substr.pipe';
import { WeekviewComponent } from './weekview/weekview.component';
import { MonthviewComponent } from './monthview/monthview.component';
import { NavmanagerComponent } from './navmanager/navmanager.component';



@NgModule({
  declarations: [MultiSelectComponent, DatePickerComponent, EventListComponent, EventComponent, SubstrPipe, WeekviewComponent, MonthviewComponent, NavmanagerComponent],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [MultiSelectComponent, EventComponent, EventListComponent]
})
export class MultiSelectModule { }
