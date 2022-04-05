import { Component, OnInit, ViewEncapsulation, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationPopupComponent implements OnInit {

  public url: any;
  data;


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

  onModalDismiss(value){
    this.activeModal.close(value);
    // this.dialogRef.close();
    // this.modalRef.dismiss();
  }

}
