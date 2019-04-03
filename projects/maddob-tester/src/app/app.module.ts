import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaddobLibModule } from 'maddob-lib';
import { BasicMarkdownEditorComponent } from './basic-markdown-editor/basic-markdown-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicMarkdownEditorComponent
  ],
  imports: [
    BrowserModule,
    MaddobLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
