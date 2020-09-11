import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StirComponent } from './stir.component';

describe('StirComponent', () => {
  let component: StirComponent;
  let fixture: ComponentFixture<StirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
