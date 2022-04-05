import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingShareComponent } from './training-share.component';

describe('TrainingShareComponent', () => {
  let component: TrainingShareComponent;
  let fixture: ComponentFixture<TrainingShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
