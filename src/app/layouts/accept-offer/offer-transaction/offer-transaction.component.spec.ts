import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTransactionComponent } from './offer-transaction.component';

describe('OfferTransactionComponent', () => {
  let component: OfferTransactionComponent;
  let fixture: ComponentFixture<OfferTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
