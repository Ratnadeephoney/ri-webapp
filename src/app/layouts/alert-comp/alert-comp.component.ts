import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-comp',
  templateUrl: './alert-comp.component.html',
  styleUrls: ['./alert-comp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertCompComponent implements OnInit {
  data;
  dataforshowing: any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log('job details', this.data, this.data.JobData);
    this.dataforshowing = this.data.AlertData;
  }

  onModalDismiss(value) {
    this.activeModal.close(value);
  }

}
