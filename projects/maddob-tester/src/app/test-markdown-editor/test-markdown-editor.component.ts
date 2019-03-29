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

  /**
   * Inserts special content into the editor 
   * 
   * can be used for different buttons like bold, italic, 
   * 
   * Override the method if you want to customize the behaviour of the 
   * insertion. For example if you have an own image selector and so on. 
   * 
   * @param type type of the content that is to be inserted
   * @param value optional value (for special integrations)
   */
  insertContent(type: string, value?: string) {
    let from = this.codeMirror.getCursor('from');
    var selection = this.codeMirror.getSelection();
    let to = this.codeMirror.getCursor('to');
    let newCursorPosition = {line: to.line, ch: to.ch};
    let additionalOffset = 0;
    var replacement = '';
    switch(type) {
      case 'bold':
        replacement = `**${selection}**`;
        this.codeMirror.replaceRange(replacement, from, to);
        additionalOffset = 2;
      break;
      case 'italic':
        replacement = `*${selection}*`;
        this.codeMirror.replaceRange(replacement, from, to);
        additionalOffset = 1;
      break;
      case 'quote':
        replacement = `> ${this.codeMirror.getLine(from.line)}`;
        this.codeMirror.replaceRange(replacement, {line: from.line, ch: 0}, {line: from.line, ch: replacement.length});
        break;
      case 'list':
        replacement = `- ${this.codeMirror.getLine(from.line)}`;
        this.codeMirror.replaceRange(replacement, {line: from.line, ch: 0}, {line: from.line, ch: replacement.length});
        break;
      case 'link':
        replacement = `[](${selection})`;
        this.codeMirror.replaceRange(replacement, from, to);
        additionalOffset = 1;
        break;
      case 'image':
        replacement = `![](${selection})`;
        this.codeMirror.replaceRange(replacement, from, to);
        additionalOffset = 2;
        break;
      case 'code':
        replacement = `\`\`\`\r\n${selection}\r\n\`\`\``;        
        this.codeMirror.replaceRange(replacement, from, to);
        additionalOffset = 4;
        break;
      default:
    }

    newCursorPosition.ch += replacement.length - selection.length - additionalOffset;

    this.codeMirror.setCursor(newCursorPosition);
    this.codeMirror.focus();
  }
}
