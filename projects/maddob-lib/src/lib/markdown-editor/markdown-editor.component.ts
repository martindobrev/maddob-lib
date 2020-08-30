import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, forwardRef, Attribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_ASYNC_VALIDATORS, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';

declare var CodeMirror: any;
declare var marked: any;

@Component({
  selector: 'maddob-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MarkdownEditorComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => MarkdownEditorComponent)
    }
  ]
})
export class MarkdownEditorComponent implements OnInit, AfterViewInit, ControlValueAccessor, Validator {
  

  /** CodeMirror editor instance */
  protected codeMirror: any;

  /** editor text value */
  private _value: string;

  /** parsed markdown value will be stored here */
  parsedHtml: string;

  /** flag for fullscreen mode */
  fullscreenEnabled = false;

  /** flag for show/hide preview area */
  previewEnabled = true;

  /** flag for disabling the editor (and all its controls) */
  disabled = false;

  get value(): string {
    return this._value || '';
  }

  set value(value: string) {
    this._value = value;
    this.parsedHtml = marked(this._value);
    this.onChange(value);
  }

  onChange = (newValue: string) => {};
  onTouched = () => {};

  @ViewChild("editor", { static: true }) editor: ElementRef;

  constructor(
    @Attribute('required') public required: boolean = false,
    @Attribute('maxlength') public maxlength: number = -1) { }

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
    });

    this.resizeCodeMirror();
  }

  /* ControlValueAccessor methods  */
  
  writeValue(obj: any): void {
    this._value = '';
    if (typeof obj === 'string' && this.codeMirror) {
      this.codeMirror.setValue(obj);
      this.onChange(obj);
    }
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;

    if (this.codeMirror) {
      this.codeMirror.setOption('readOnly', isDisabled);
    }
  }

  /* END ControlValueAccessor methods  */


  /**
   * Validate implementation 
   * 
   * only required and maxlength for now
   */
  validate(control: AbstractControl): ValidationErrors {
    let result: any = null;
    if (this.required && this._value.length === 0) {
      result = { required: true };
    }
    if (this.maxlength > 0 && this.value.length > this.maxlength) {
      result = { maxlength: true };
    }
    return result;
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
   * @param value optional value (for special custom content)
   */
  insertContent(type: string, value?: string) {
    let from = this.codeMirror.getCursor('from');
    // if value is set, use it, if not get the selection instead
    var selection = value ? value: this.codeMirror.getSelection();
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
    this.onChange(this._value);
  }
}
