import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadEbookHeaderComponent } from './download-ebook-header.component';

describe('DownloadEbookHeaderComponent', () => {
  let component: DownloadEbookHeaderComponent;
  let fixture: ComponentFixture<DownloadEbookHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadEbookHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadEbookHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
