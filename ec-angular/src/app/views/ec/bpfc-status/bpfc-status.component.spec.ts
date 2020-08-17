import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpfcStatusComponent } from './bpfc-status.component';

describe('BpfcStatusComponent', () => {
  let component: BpfcStatusComponent;
  let fixture: ComponentFixture<BpfcStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpfcStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpfcStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
