import { NgModule } from '@angular/core';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UikitMarkdownEditorComponent } from './uikit-markdown-editor/uikit-markdown-editor.component';

@NgModule({
  declarations: [MarkdownEditorComponent, UikitMarkdownEditorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MarkdownEditorComponent, UikitMarkdownEditorComponent]
})
export class MaddobLibModule {}
