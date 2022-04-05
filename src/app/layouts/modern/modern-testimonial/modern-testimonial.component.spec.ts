import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernTestimonialComponent } from './modern-testimonial.component';

describe('ModernTestimonialComponent', () => {
  let component: ModernTestimonialComponent;
  let fixture: ComponentFixture<ModernTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernTestimonialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
