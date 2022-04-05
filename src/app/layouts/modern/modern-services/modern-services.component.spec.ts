import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernServicesComponent } from './modern-services.component';

describe('ModernServicesComponent', () => {
  let component: ModernServicesComponent;
  let fixture: ComponentFixture<ModernServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
