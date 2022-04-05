import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernFunctionComponent } from './modern-function.component';

describe('ModernFunctionComponent', () => {
  let component: ModernFunctionComponent;
  let fixture: ComponentFixture<ModernFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernFunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
