import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernHeaderTrainingsComponent } from './modern-header-trainings.component';

describe('ModernHeaderTrainingsComponent', () => {
  let component: ModernHeaderTrainingsComponent;
  let fixture: ComponentFixture<ModernHeaderTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernHeaderTrainingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernHeaderTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
