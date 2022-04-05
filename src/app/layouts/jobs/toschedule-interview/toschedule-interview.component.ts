import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../shared/service/common.service';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { MyAppHttpService } from '../../../shared/service/my-app-http.service';

@Component({
  selector: 'app-toschedule-interview',
  templateUrl: './toschedule-interview.component.html',
  styleUrls: ['./toschedule-interview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToscheduleInterviewComponent implements OnInit {

  onDismissValue: boolean = false;
  constructor(public activeModal: NgbActiveModal, public dataStorage: DataStorageService, 
    private commonService: CommonService, public modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onModalDismiss(value) {
    if(navigator.onLine) {
      this.onDismissValue = value;
      this.activeModal.close(this.onDismissValue);
    }
    else {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Offline', 'You are offline now');
    }
    
  }

}
