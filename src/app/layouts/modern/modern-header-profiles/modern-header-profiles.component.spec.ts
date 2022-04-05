import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernHeaderProfilesComponent } from './modern-header-profiles.component';

describe('ModernHeaderProfilesComponent', () => {
  let component: ModernHeaderProfilesComponent;
  let fixture: ComponentFixture<ModernHeaderProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernHeaderProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernHeaderProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
