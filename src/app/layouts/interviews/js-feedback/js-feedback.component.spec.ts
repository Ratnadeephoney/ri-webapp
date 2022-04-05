import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsFeedbackComponent } from './js-feedback.component';

describe('JsFeedbackComponent', () => {
  let component: JsFeedbackComponent;
  let fixture: ComponentFixture<JsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
