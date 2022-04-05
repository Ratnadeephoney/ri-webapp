import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectOfferComponent } from './reject-offer.component';

describe('RejectOfferComponent', () => {
  let component: RejectOfferComponent;
  let fixture: ComponentFixture<RejectOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
