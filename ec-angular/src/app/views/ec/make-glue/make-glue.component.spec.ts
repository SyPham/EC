/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MakeGlueComponent } from './make-glue.component';

describe('MakeGlueComponent', () => {
  let component: MakeGlueComponent;
  let fixture: ComponentFixture<MakeGlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeGlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeGlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
