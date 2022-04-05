import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernTeamComponent } from './modern-team.component';

describe('ModernTeamComponent', () => {
  let component: ModernTeamComponent;
  let fixture: ComponentFixture<ModernTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
