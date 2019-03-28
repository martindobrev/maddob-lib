import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMarkdownEditorComponent } from './test-markdown-editor.component';

describe('TestMarkdownEditorComponent', () => {
  let component: TestMarkdownEditorComponent;
  let fixture: ComponentFixture<TestMarkdownEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMarkdownEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMarkdownEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
