/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GlueComponent } from './glue.component';

describe('GlueComponent', () => {
  let component: GlueComponent;
  let fixture: ComponentFixture<GlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
