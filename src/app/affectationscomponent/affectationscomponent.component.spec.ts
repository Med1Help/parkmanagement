import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationscomponentComponent } from './affectationscomponent.component';

describe('AffectationscomponentComponent', () => {
  let component: AffectationscomponentComponent;
  let fixture: ComponentFixture<AffectationscomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectationscomponentComponent]
    });
    fixture = TestBed.createComponent(AffectationscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
