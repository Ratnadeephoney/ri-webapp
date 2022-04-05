import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredTrainingUsersComponent } from './registered-training-users.component';

describe('RegisteredTrainingUsersComponent', () => {
  let component: RegisteredTrainingUsersComponent;
  let fixture: ComponentFixture<RegisteredTrainingUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredTrainingUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredTrainingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
