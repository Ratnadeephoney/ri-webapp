import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerTrainingsBodyComponent } from './jobseeker-trainings-body.component';

describe('JobseekerTrainingsBodyComponent', () => {
  let component: JobseekerTrainingsBodyComponent;
  let fixture: ComponentFixture<JobseekerTrainingsBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerTrainingsBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerTrainingsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
