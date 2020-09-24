import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingSettingComponent } from './building-setting.component';

describe('BuildingSettingComponent', () => {
  let component: BuildingSettingComponent;
  let fixture: ComponentFixture<BuildingSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
