import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/shared/service/common.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';

@Component({
  selector: 'app-training-share',
  templateUrl: './training-share.component.html',
  styleUrls: ['./training-share.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingShareComponent implements OnInit {
  data;
  jobseekersList;
  selectedJSList: any = [];
  constructor(public activeModal: NgbActiveModal, private commonService: CommonService) { }

  ngOnInit(): void {
    this.jobseekersList = this.data.jobseekersList;
    this.jobseekersList.map(x => x.selected = false);
  }

  onModalDismiss(value) {
    
    if (!value) {
      this.activeModal.close(null);
    }
    else {
      if (this.selectedJSList.length != 0) {
        // this.modalCtrl.dismiss(this.selectedJSList);
        console.log('sending select', this.selectedJSList);
        this.activeModal.close(this.selectedJSList);
      }
      else {
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Jobseeker', 'Please select atleast one user');
      }
    }
  }

  selectJS(event, js) {
    console.log('js: ', js, event);
    if(js.selected == true) {
      this.selectedJSList.push({userId: js.userId});
    }
    else {
      this.selectedJSList = this.selectedJSList.filter(x => x.userId != js.userId);
    }
    // if(js.isSuggested == true) {
    //   this.selectedJSList.push({userId: js.userId});
    // }
    // else {
    //   this.selectedJSList = this.selectedJSList.filter(x => x.userId != js.userId);
    // }
    console.log('Selected jobseekers : ', this.selectedJSList);
  }

}
