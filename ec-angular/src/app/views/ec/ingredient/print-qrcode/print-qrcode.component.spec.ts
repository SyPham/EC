import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintQRCodeComponent } from './print-qrcode.component';

describe('PrintQRCodeComponent', () => {
  let component: PrintQRCodeComponent;
  let fixture: ComponentFixture<PrintQRCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintQRCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintQRCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
