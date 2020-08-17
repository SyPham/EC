import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishedRecordComponent } from './established-record.component';

describe('EstablishedRecordComponent', () => {
  let component: EstablishedRecordComponent;
  let fixture: ComponentFixture<EstablishedRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishedRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishedRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
