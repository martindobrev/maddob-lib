import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare var CodeMirror: any;
declare var marked: any;

@Component({
  selector: 'app-basic-markdown-editor',
  templateUrl: './basic-markdown-editor.component.html',
  styleUrls: ['./basic-markdown-editor.component.css']
})
export class BasicMarkdownEditorComponent implements OnInit, AfterViewInit {

  codeMirror: any;

  parsedHtml = '';

  previewEnabled = true;

  fullscreenEnabled = false;

  @ViewChild("editor") editor: ElementRef;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    // initialize code mirror instance
    this.codeMirror = CodeMirror.fromTextArea(this.editor.nativeElement, {
      mode: 'markdown',
      lineNumbers: true,
      lineWrapping: true
    });

    // refresh preview on change
    this.codeMirror.doc.on('change', (instance: any, change: any) => {
      this.parsedHtml = marked(instance.getValue());
    });

    this.resizeEditor();
  }

  /**
   * Resize codemirror editor
   * 
   * Adjust the editor size in case the div size changes
   */
  resizeEditor() {
    setTimeout(() => {
      const editorContainer = this.editor.nativeElement.parentNode;
      this.codeMirror.setSize(editorContainer.offsetWidth, editorContainer.offsetHeight);
    }, 200);
  }

  togglePreview() {
    this.previewEnabled = !this.previewEnabled;
    this.resizeEditor();
  }

  toggleFullscreen() {
    this.fullscreenEnabled = !this.fullscreenEnabled;
    this.resizeEditor();
  }
}
