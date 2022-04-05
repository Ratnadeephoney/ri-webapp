import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernTeamMemberComponent } from './modern-team-member.component';

describe('ModernTeamMemberComponent', () => {
  let component: ModernTeamMemberComponent;
  let fixture: ComponentFixture<ModernTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernTeamMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
