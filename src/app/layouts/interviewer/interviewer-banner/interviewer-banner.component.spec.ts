import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerBannerComponent } from './interviewer-banner.component';

describe('InterviewerBannerComponent', () => {
  let component: InterviewerBannerComponent;
  let fixture: ComponentFixture<InterviewerBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewerBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
