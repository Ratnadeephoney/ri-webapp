import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToscheduleInterviewComponent } from './toschedule-interview.component';

describe('ToscheduleInterviewComponent', () => {
  let component: ToscheduleInterviewComponent;
  let fixture: ComponentFixture<ToscheduleInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToscheduleInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToscheduleInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
