import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredHistoryComponent } from './delivered-history.component';

describe('DeliveredHistoryComponent', () => {
  let component: DeliveredHistoryComponent;
  let fixture: ComponentFixture<DeliveredHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveredHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
