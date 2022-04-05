import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerBookMockInterviewComponent } from './jobseeker-book-mock-interview.component';

describe('JobseekerBookMockInterviewComponent', () => {
  let component: JobseekerBookMockInterviewComponent;
  let fixture: ComponentFixture<JobseekerBookMockInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerBookMockInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerBookMockInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
