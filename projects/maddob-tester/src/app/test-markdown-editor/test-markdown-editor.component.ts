import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare var CodeMirror: any;
declare var marked: any;

@Component({
  selector: 'app-test-markdown-editor',
  templateUrl: './test-markdown-editor.component.html',
  styleUrls: ['./test-markdown-editor.component.css']
})
export class TestMarkdownEditorComponent implements OnInit, AfterViewInit {

  /** CodeMirror editor instance */
  private codeMirror: any;

  /** editor text value */
  private value: string;

  /** parsed markdown value will be stored here */
  parsedHtml: string;

  /** flag for fullscreen mode */
  fullscreenEnabled = false;

  /** flag for show/hide preview area */
  previewEnabled = true;

  @ViewChild("editor") editor: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.codeMirror = CodeMirror.fromTextArea(this.editor.nativeElement, {
      mode: 'markdown',
      lineNumbers: true,
      autoCloseTags: true,
      lineWrapping: true,
      extraKeys: {'Ctrl-Space': 'autocomplete'}
    });

    this.codeMirror.doc.on('change', (instance: any, change: any) => {
      this.value = instance.getValue();
      this.parsedHtml = marked(this.value);
    });

    this.resizeCodeMirror();
  }

  /**
   * Resizes the code mirror instance to the size of the container
   * 
   * Used when the code mirror editor element size is changed (window resize, )
   */
  resizeCodeMirror() {
    setTimeout(() => {
      const editorContainer = this.editor.nativeElement.parentNode;
      this.codeMirror.setSize(editorContainer.offsetWidth, editorContainer.offsetHeight);
    }, 200);
  }
  
  toggleFullscreen() {
    this.fullscreenEnabled = !this.fullscreenEnabled;
    this.resizeCodeMirror();
  }

  togglePreview() {
    this.previewEnabled = !this.previewEnabled;
    this.resizeCodeMirror();
  }
}
