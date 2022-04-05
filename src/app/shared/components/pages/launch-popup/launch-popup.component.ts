import { Component, OnInit, ViewEncapsulation, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-launch-popup',
  templateUrl: './launch-popup.component.html',
  styleUrls: ['./launch-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LaunchPopupComponent implements OnInit {

  public url: any;
  public enterpriseUrl = environment.enterpriseUrl;


  constructor(private router: Router, public activeModal: NgbActiveModal,
    public translate: TranslateService) {
  
  }


  ngOnInit() {

  }

  onModalDismiss(){
    this.activeModal.close();
  }



}
