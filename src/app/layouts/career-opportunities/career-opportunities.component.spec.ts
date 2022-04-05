import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerOpportunitiesComponent } from './career-opportunities.component';

describe('CareerOpportunitiesComponent', () => {
  let component: CareerOpportunitiesComponent;
  let fixture: ComponentFixture<CareerOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerOpportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
