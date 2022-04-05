import { Component, OnInit, ViewEncapsulation, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';

@Component({
  selector: 'app-jod-modal',
  templateUrl: './jod-modal.component.html',
  styleUrls: ['./jod-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JODModalComponent implements OnInit {

  public url: any;
  public jodurl: any;


  constructor(private router: Router, public activeModal: NgbActiveModal,
    public translate: TranslateService, public dataStorage: DataStorageService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });

    this.jodurl = this.dataStorage.globalJODUrl;
  }


  ngOnInit() {

  }

  onModalDismiss(){
    this.activeModal.close();
    // this.dialogRef.close();
    // this.modalRef.dismiss();
  }


  goToLink() {
      window.open(this.jodurl);
  }


}
