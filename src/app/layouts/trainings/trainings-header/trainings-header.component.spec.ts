import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsHeaderComponent } from './trainings-header.component';

describe('TrainingsHeaderComponent', () => {
  let component: TrainingsHeaderComponent;
  let fixture: ComponentFixture<TrainingsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
