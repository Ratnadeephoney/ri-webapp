import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-terms-and-conditions-header',
  templateUrl: './terms-and-conditions-header.component.html',
  styleUrls: ['./terms-and-conditions-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsAndConditionsHeaderComponent implements OnInit {
  constructor() {
     }

  ngOnInit() {
  }

}
