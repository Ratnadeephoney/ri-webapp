import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupInterviewComponent } from './setup-interview.component';

describe('SetupInterviewComponent', () => {
  let component: SetupInterviewComponent;
  let fixture: ComponentFixture<SetupInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
