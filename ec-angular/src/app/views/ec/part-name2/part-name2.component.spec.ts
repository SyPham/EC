import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartName2Component } from './part-name2.component';

describe('PartName2Component', () => {
  let component: PartName2Component;
  let fixture: ComponentFixture<PartName2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartName2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartName2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
