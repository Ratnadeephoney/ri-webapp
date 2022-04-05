import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedFooterComponent } from './detailed-footer.component';

describe('DetailedFooterComponent', () => {
  let component: DetailedFooterComponent;
  let fixture: ComponentFixture<DetailedFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
