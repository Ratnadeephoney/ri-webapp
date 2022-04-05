import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntFeedbackComponent } from './int-feedback.component';

describe('IntFeedbackComponent', () => {
  let component: IntFeedbackComponent;
  let fixture: ComponentFixture<IntFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
