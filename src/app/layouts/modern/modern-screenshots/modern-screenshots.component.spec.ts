import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernScreenshotsComponent } from './modern-screenshots.component';

describe('ModernScreenshotsComponent', () => {
  let component: ModernScreenshotsComponent;
  let fixture: ComponentFixture<ModernScreenshotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernScreenshotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernScreenshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
