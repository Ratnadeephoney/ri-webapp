import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeMentorNewComponent } from './become-mentor-new.component';

describe('BecomeMentorNewComponent', () => {
  let component: BecomeMentorNewComponent;
  let fixture: ComponentFixture<BecomeMentorNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeMentorNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeMentorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
