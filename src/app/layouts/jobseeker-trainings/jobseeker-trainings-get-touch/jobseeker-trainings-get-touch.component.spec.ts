import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerTrainingsGetTouchComponent } from './jobseeker-trainings-get-touch.component';

describe('JobseekerTrainingsGetTouchComponent', () => {
  let component: JobseekerTrainingsGetTouchComponent;
  let fixture: ComponentFixture<JobseekerTrainingsGetTouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerTrainingsGetTouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerTrainingsGetTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
