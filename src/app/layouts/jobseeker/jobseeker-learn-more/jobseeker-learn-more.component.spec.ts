import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerLearnMoreComponent } from './jobseeker-learn-more.component';

describe('JobseekerLearnMoreComponent', () => {
  let component: JobseekerLearnMoreComponent;
  let fixture: ComponentFixture<JobseekerLearnMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerLearnMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerLearnMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
