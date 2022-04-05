import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsNewComponent } from './job-details-new.component';

describe('JobDetailsNewComponent', () => {
  let component: JobDetailsNewComponent;
  let fixture: ComponentFixture<JobDetailsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
