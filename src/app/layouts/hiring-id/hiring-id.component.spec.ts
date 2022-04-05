import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringIdComponent } from './hiring-id.component';

describe('HiringIdComponent', () => {
  let component: HiringIdComponent;
  let fixture: ComponentFixture<HiringIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
