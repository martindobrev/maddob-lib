import { NgModule } from '@angular/core';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UikitMarkdownEditorComponent } from './uikit-markdown-editor/uikit-markdown-editor.component';
import { ReadableTimePipe } from './pipes/readable-time.pipe';

@NgModule({
  declarations: [MarkdownEditorComponent, UikitMarkdownEditorComponent, ReadableTimePipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MarkdownEditorComponent, UikitMarkdownEditorComponent, ReadableTimePipe]
})
export class MaddobLibModule {}
