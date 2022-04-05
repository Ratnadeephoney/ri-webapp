import { Component, OnInit, ViewEncapsulation, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DownloadAppComponent implements OnInit {

  public url: any;
  submitted: boolean;
  downloadAppForm: FormGroup

  validation_messages = {
  mobileNumber: [
    { type: 'required', message: 'Please enter valid mobile number' },
    { type: 'pattern', message: 'Please enter valid mobile number' }
  ]
};

  constructor(private router: Router, public activeModal: NgbActiveModal,
    public translate: TranslateService,
    public dataStorage: DataStorageService,
    private commonService: CommonService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }


  ngOnInit() {
      this.downloadAppForm = new FormBuilder().group({
          mobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.MOBILE_NUMBER)])]
      });
  }

  onModalDismiss(){
    this.activeModal.close();
    // this.dialogRef.close();
    // this.modalRef.dismiss();
  }

  onlyDecimalNumberKey(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if ( charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  validateAndSubmit() {
      if(this.downloadAppForm.invalid) {
          this.submitted = true;
          return false;
      }
      else{
          this.submitted = false;
      }

      var requestObj = {
        phone: this.downloadAppForm.value.mobileNumber
      }
      this.commonService.sendAppLink(requestObj).subscribe(success => {
        if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
          this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Download App', success.statusMessage)
          this.downloadAppForm.reset();
          this.onModalDismiss();
        }
      }, error => {
  
      });
  }

}
