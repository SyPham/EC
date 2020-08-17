import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartName1Component } from './part-name1.component';

describe('PartName1Component', () => {
  let component: PartName1Component;
  let fixture: ComponentFixture<PartName1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartName1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartName1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
