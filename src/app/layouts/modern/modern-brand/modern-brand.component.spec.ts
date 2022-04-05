import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernBrandComponent } from './modern-brand.component';

describe('ModernBrandComponent', () => {
  let component: ModernBrandComponent;
  let fixture: ComponentFixture<ModernBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
