import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAssuranceComponent } from './job-assurance.component';

describe('JobAssuranceComponent', () => {
  let component: JobAssuranceComponent;
  let fixture: ComponentFixture<JobAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAssuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
