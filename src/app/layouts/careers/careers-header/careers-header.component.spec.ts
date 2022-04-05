import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersHeaderComponent } from './careers-header.component';

describe('CareersHeaderComponent', () => {
  let component: CareersHeaderComponent;
  let fixture: ComponentFixture<CareersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareersHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
