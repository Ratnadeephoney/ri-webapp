import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerReadFaqComponent } from './interviewer-read-faq.component';

describe('InterviewerReadFaqComponent', () => {
  let component: InterviewerReadFaqComponent;
  let fixture: ComponentFixture<InterviewerReadFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewerReadFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerReadFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
