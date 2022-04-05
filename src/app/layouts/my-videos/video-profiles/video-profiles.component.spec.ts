import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoProfilesComponent } from './video-profiles.component';

describe('VideoProfilesComponent', () => {
  let component: VideoProfilesComponent;
  let fixture: ComponentFixture<VideoProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
