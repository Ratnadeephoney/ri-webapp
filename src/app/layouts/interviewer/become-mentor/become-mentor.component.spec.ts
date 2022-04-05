import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeMentorComponent } from './become-mentor.component';

describe('BecomeMentorComponent', () => {
  let component: BecomeMentorComponent;
  let fixture: ComponentFixture<BecomeMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeMentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
