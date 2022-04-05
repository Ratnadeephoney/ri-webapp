import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernBlogComponent } from './modern-blog.component';

describe('ModernBlogComponent', () => {
  let component: ModernBlogComponent;
  let fixture: ComponentFixture<ModernBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
