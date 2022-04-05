import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAboutComponent } from './team-about.component';

describe('TeamAboutComponent', () => {
  let component: TeamAboutComponent;
  let fixture: ComponentFixture<TeamAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
