import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernPricingComponent } from './modern-pricing.component';

describe('ModernPricingComponent', () => {
  let component: ModernPricingComponent;
  let fixture: ComponentFixture<ModernPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
