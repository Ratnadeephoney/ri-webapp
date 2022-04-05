import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernAboutOtherComponent } from './modern-about-other.component';

describe('ModernAboutOtherComponent', () => {
  let component: ModernAboutOtherComponent;
  let fixture: ComponentFixture<ModernAboutOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernAboutOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernAboutOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
