import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchPopupComponent } from './launch-popup.component';

describe('LaunchPopupComponent', () => {
  let component: LaunchPopupComponent;
  let fixture: ComponentFixture<LaunchPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
