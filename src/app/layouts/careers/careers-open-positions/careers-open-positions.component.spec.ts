import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersOpenPositionsComponent } from './careers-open-positions.component';

describe('CareersOpenPositionsComponent', () => {
  let component: CareersOpenPositionsComponent;
  let fixture: ComponentFixture<CareersOpenPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareersOpenPositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareersOpenPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
