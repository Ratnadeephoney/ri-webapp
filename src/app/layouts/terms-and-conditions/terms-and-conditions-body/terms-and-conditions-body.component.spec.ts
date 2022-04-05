import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsBodyComponent } from './terms-and-conditions-body.component';

describe('TermsAndConditionsBodyComponent', () => {
  let component: TermsAndConditionsBodyComponent;
  let fixture: ComponentFixture<TermsAndConditionsBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
