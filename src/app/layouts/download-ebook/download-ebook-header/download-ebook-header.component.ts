import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-download-ebook-header',
  templateUrl: './download-ebook-header.component.html',
  styleUrls: ['./download-ebook-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DownloadEbookHeaderComponent implements OnInit {
  constructor() {
     }

  ngOnInit() {
  }

}
