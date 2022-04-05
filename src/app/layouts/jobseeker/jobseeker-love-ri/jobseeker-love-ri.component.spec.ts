import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerLoveRiComponent } from './jobseeker-love-ri.component';

describe('JobseekerLoveRiComponent', () => {
  let component: JobseekerLoveRiComponent;
  let fixture: ComponentFixture<JobseekerLoveRiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerLoveRiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerLoveRiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
