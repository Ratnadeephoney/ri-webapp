import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernSubscribeComponent } from './modern-subscribe.component';

describe('ModernSubscribeComponent', () => {
  let component: ModernSubscribeComponent;
  let fixture: ComponentFixture<ModernSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
