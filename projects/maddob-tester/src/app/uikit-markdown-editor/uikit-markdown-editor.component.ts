import { Component, OnInit, forwardRef } from '@angular/core';
import { TestMarkdownEditorComponent } from '../test-markdown-editor/test-markdown-editor.component';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-uikit-markdown-editor',
  templateUrl: './uikit-markdown-editor.component.html',
  styleUrls: ['./uikit-markdown-editor.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UikitMarkdownEditorComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => UikitMarkdownEditorComponent)
    }
  ]

})
export class UikitMarkdownEditorComponent extends TestMarkdownEditorComponent implements OnInit {

  ngOnInit() {

  }
  
  resizeCodeMirror() {
    setTimeout(() => {
      const editorContainer = this.editor.nativeElement.parentNode;
      this.codeMirror.setSize(editorContainer.offsetWidth - 50, editorContainer.offsetHeight);
    }, 200);
  }
}