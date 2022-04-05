import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JodModalComponent } from './jod-modal.component';

describe('JodModalComponent', () => {
  let component: JodModalComponent;
  let fixture: ComponentFixture<JodModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JodModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JodModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
