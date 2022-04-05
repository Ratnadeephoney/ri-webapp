import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrefferaluserComponent } from './addrefferaluser.component';

describe('AddrefferaluserComponent', () => {
  let component: AddrefferaluserComponent;
  let fixture: ComponentFixture<AddrefferaluserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrefferaluserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrefferaluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
