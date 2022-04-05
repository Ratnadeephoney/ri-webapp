import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadEbookBodyComponent } from './download-ebook-body.component';

describe('DownloadEbookBodyComponent', () => {
  let component: DownloadEbookBodyComponent;
  let fixture: ComponentFixture<DownloadEbookBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadEbookBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadEbookBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
