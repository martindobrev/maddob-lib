import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare var CodeMirror: any;
declare var marked: any;

@Component({
  selector: 'app-basic-markdown-editor',
  templateUrl: './basic-markdown-editor.component.html',
  styleUrls: ['./basic-markdown-editor.component.css']
})
export class BasicMarkdownEditorComponent implements OnInit, AfterViewInit {


  parsedHtml = '';

  @ViewChild("editor") editor: ElementRef;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    // initialize code mirror instance
    const codeMirror = CodeMirror.fromTextArea(this.editor.nativeElement, {
      mode: 'markdown',
      lineNumbers: true
    });

    // refresh preview on change
    codeMirror.doc.on('change', (instance: any, change: any) => {
      this.parsedHtml = marked(instance.getValue());
    });
  }
}
