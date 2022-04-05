import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadEbookComponent } from './download-ebook.component';

describe('DownloadEbookComponent', () => {
  let component: DownloadEbookComponent;
  let fixture: ComponentFixture<DownloadEbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadEbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadEbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
