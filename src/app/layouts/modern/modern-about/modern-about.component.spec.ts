import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernAboutComponent } from './modern-about.component';

describe('ModernAboutComponent', () => {
  let component: ModernAboutComponent;
  let fixture: ComponentFixture<ModernAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
