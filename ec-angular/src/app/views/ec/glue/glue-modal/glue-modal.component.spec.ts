/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GlueModalComponent } from './glue-modal.component';

describe('GlueModalComponent', () => {
  let component: GlueModalComponent;
  let fixture: ComponentFixture<GlueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
