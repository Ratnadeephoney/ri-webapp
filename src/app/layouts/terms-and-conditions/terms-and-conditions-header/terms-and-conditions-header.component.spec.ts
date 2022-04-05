import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsHeaderComponent } from './terms-and-conditions-header.component';

describe('TermsAndConditionsHeaderComponent', () => {
  let component: TermsAndConditionsHeaderComponent;
  let fixture: ComponentFixture<TermsAndConditionsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
