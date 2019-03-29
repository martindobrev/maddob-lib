import { NgModule } from '@angular/core';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MarkdownEditorComponent]
})
export class MaddobLibModule {}
