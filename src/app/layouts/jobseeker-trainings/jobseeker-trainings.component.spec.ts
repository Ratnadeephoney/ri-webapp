import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerTrainingsComponent } from './jobseeker-trainings.component';

describe('JobseekerTrainingsComponent', () => {
  let component: JobseekerTrainingsComponent;
  let fixture: ComponentFixture<JobseekerTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerTrainingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
