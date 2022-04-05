import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerFaqComponent } from './interviewer-faq.component';

describe('InterviewerFaqComponent', () => {
  let component: InterviewerFaqComponent;
  let fixture: ComponentFixture<InterviewerFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewerFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
