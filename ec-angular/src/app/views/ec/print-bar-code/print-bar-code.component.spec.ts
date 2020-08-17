import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBarCodeComponent } from './print-bar-code.component';

describe('PrintBarCodeComponent', () => {
  let component: PrintBarCodeComponent;
  let fixture: ComponentFixture<PrintBarCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintBarCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBarCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
