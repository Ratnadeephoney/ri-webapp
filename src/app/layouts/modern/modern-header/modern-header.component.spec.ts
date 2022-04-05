import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernHeaderComponent } from './modern-header.component';

describe('ModernHeaderComponent', () => {
  let component: ModernHeaderComponent;
  let fixture: ComponentFixture<ModernHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
