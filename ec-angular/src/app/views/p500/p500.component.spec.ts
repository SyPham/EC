import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P500Component } from './p500.component';

describe('P500Component', () => {
  let component: P500Component;
  let fixture: ComponentFixture<P500Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P500Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
