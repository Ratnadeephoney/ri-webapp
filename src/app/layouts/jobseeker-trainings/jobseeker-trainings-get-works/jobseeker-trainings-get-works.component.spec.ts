import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerTrainingsGetWorksComponent } from './jobseeker-trainings-get-works.component';

describe('JobseekerTrainingsGetWorksComponent', () => {
  let component: JobseekerTrainingsGetWorksComponent;
  let fixture: ComponentFixture<JobseekerTrainingsGetWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerTrainingsGetWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerTrainingsGetWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
