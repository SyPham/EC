/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BpfcComponent } from './bpfc.component';

describe('BpfcComponent', () => {
  let component: BpfcComponent;
  let fixture: ComponentFixture<BpfcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpfcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
