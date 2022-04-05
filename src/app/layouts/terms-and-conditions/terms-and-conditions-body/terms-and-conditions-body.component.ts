import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-terms-and-conditions-body',
  templateUrl: './terms-and-conditions-body.component.html',
  styleUrls: ['./terms-and-conditions-body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsAndConditionsBodyComponent implements OnInit {
  constructor() {
     }

  ngOnInit() {
  }

}
