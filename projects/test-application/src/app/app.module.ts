import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MultiSelectModule} from '../../../calendar/src/lib/multi-select.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MultiSelectModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
