import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverscomponentComponent } from './driverscomponent.component';

describe('DriverscomponentComponent', () => {
  let component: DriverscomponentComponent;
  let fixture: ComponentFixture<DriverscomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverscomponentComponent]
    });
    fixture = TestBed.createComponent(DriverscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
