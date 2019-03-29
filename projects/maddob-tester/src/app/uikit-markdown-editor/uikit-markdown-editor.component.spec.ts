import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UikitMarkdownEditorComponent } from './uikit-markdown-editor.component';

describe('UikitMarkdownEditorComponent', () => {
  let component: UikitMarkdownEditorComponent;
  let fixture: ComponentFixture<UikitMarkdownEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UikitMarkdownEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UikitMarkdownEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
