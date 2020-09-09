import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnormalListComponent } from './abnormal-list.component';

describe('AbnormalListComponent', () => {
  let component: AbnormalListComponent;
  let fixture: ComponentFixture<AbnormalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbnormalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbnormalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
