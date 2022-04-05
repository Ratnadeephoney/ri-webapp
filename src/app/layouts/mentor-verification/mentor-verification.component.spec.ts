import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorVerificationComponent } from './mentor-verification.component';

describe('MentorVerificationComponent', () => {
  let component: MentorVerificationComponent;
  let fixture: ComponentFixture<MentorVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
