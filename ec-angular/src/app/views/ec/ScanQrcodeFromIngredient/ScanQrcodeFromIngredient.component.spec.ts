/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ScanQrcodeFromIngredientComponent } from './ScanQrcodeFromIngredient.component';

describe('ScanQrcodeFromIngredientComponent', () => {
  let component: ScanQrcodeFromIngredientComponent;
  let fixture: ComponentFixture<ScanQrcodeFromIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanQrcodeFromIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanQrcodeFromIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
