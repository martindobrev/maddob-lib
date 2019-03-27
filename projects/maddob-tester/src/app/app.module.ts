import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaddobLibModule } from 'maddob-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaddobLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
