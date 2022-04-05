import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernHeaderJobsComponent } from './modern-header-jobs.component';

describe('ModernHeaderJobsComponent', () => {
  let component: ModernHeaderJobsComponent;
  let fixture: ComponentFixture<ModernHeaderJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernHeaderJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernHeaderJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
