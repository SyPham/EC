import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialNameComponent } from './material-name.component';

describe('MaterialNameComponent', () => {
  let component: MaterialNameComponent;
  let fixture: ComponentFixture<MaterialNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
