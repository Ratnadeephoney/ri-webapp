import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernEbookComponent } from './modern-ebook.component';

describe('ModernEbookComponent', () => {
  let component: ModernEbookComponent;
  let fixture: ComponentFixture<ModernEbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernEbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernEbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
