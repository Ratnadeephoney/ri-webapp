import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernFooterComponent } from './modern-footer.component';

describe('ModernFooterComponent', () => {
  let component: ModernFooterComponent;
  let fixture: ComponentFixture<ModernFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
