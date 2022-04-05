import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerFaqComponent } from './jobseeker-faq.component';

describe('JobseekerFaqComponent', () => {
  let component: JobseekerFaqComponent;
  let fixture: ComponentFixture<JobseekerFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
