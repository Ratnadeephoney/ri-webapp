import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerRatingComponent } from './peer-rating.component';

describe('PeerRatingComponent', () => {
  let component: PeerRatingComponent;
  let fixture: ComponentFixture<PeerRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
