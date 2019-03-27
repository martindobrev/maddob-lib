import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaddobLibComponent } from './maddob-lib.component';

describe('MaddobLibComponent', () => {
  let component: MaddobLibComponent;
  let fixture: ComponentFixture<MaddobLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaddobLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaddobLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
