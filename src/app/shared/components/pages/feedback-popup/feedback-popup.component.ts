import { Component, OnInit, ViewEncapsulation, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-feedback-popup',
  templateUrl: './feedback-popup.component.html',
  styleUrls: ['./feedback-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackPopupComponent implements OnInit {

  public url: any;


  constructor(private router: Router, public activeModal: NgbActiveModal,
    public translate: TranslateService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }


  ngOnInit() {

  }

  onModalDismiss(){
    this.activeModal.close();
    // this.dialogRef.close();
    // this.modalRef.dismiss();
  }



}
