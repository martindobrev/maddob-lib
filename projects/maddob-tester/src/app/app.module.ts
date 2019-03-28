import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaddobLibModule } from 'maddob-lib';
import { TestMarkdownEditorComponent } from './test-markdown-editor/test-markdown-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TestMarkdownEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaddobLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
