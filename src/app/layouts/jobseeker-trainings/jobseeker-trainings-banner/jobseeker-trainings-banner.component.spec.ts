import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerTrainingsBannerComponent } from './jobseeker-trainings-banner.component';

describe('JobseekerTrainingsBannerComponent', () => {
  let component: JobseekerTrainingsBannerComponent;
  let fixture: ComponentFixture<JobseekerTrainingsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerTrainingsBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerTrainingsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
