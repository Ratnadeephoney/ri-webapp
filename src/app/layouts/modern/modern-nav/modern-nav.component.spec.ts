import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernNavComponent } from './modern-nav.component';

describe('ModernNavComponent', () => {
  let component: ModernNavComponent;
  let fixture: ComponentFixture<ModernNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
