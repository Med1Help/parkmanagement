import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarscomponentComponent } from './carscomponent.component';

describe('CarscomponentComponent', () => {
  let component: CarscomponentComponent;
  let fixture: ComponentFixture<CarscomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarscomponentComponent]
    });
    fixture = TestBed.createComponent(CarscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
