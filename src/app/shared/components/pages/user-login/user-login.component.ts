import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyAppHttpService } from '../../../service/my-app-http.service';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { CommonService } from '../../../service/common.service';
import { WebsocketService } from 'src/app/shared/service/WebSocket.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserLoginComponent implements OnInit {

  public url: any;
  submittedMobile: boolean;
  submittedOTP: boolean;
  userLoginForm: FormGroup;
  isOTPSent;
  sessionId;
  data;
  enableResendButton;
  @ViewChild('OTP') otp;

  validation_messages = {
    mobileNumber: [
      { type: 'required', message: 'Mobile number is required' },
      { type: 'pattern', message: 'Please enter valid mobile number' }
    ],
    otp: [
      { type: 'required', message: 'OTP is required' },
      { type: 'pattern', message: 'Please enter valid OTP' }
    ]
  };

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputClass: 'otpClass',
    inputStyles: {
      width: '40px',
      height: '40px',
      'margin-top': '10px',
      'font-size': '14px'
    }
  };

  constructor(private router: Router, public activeModal: NgbActiveModal,
    public translate: TranslateService,
    public dataStorage: DataStorageService,
    private commonService: CommonService,
    public wsService: WebsocketService,
    private modalService: NgbModal) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });

  }


  ngOnInit() {

    this.userLoginForm = new FormBuilder().group({
      mobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.MOBILE_NUMBER)])],
      otp: ['', Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.OTP)])]
    });

    setTimeout(() => {
      this.focusMobileNumber();
    }, 100);


  }

  focusMobileNumber() {
    document.getElementById('txtMobileNumber').focus();
  }

  focusOTP() {
    document.getElementById(`otp_0_${this.otp.componentKey}`).focus();
  }


  onModalDismiss(returnObj = {}) {
    this.activeModal.close({ returnObj });
    // this.dialogRef.close();
    // this.modalRef.dismiss();
  }

  onlyDecimalNumberKey(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  editMobileNumber() {

  }

  generateOTP() {
    if (this.userLoginForm.controls.mobileNumber.invalid) {
      this.submittedMobile = true;
      return false;
    }

    var requestObj = {
      phone: this.userLoginForm.value.mobileNumber
    }
    this.commonService.sendOTP(requestObj).subscribe((response) => {
      if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.isOTPSent = true;
        this.sessionId = response.sessionId;
        this.enableResendButton = false;
        this.focusOTP();
        setTimeout(() => {
          this.enableResendButton = true;
        }, 20000);
      }
    }, (error) => {

    });

  }

  resendOTP() {

  }

  onOTPKeyEnter() {
    this.verifyOTP();
  }

  verifyOTP() {
    if (this.userLoginForm.controls.otp.invalid) {
      this.submittedOTP = true;
      return false;
    }

    var requestObj = {
      userInput: this.userLoginForm.value.otp,
      "sessionId": this.sessionId,
      "isOtherOperationSelected": this.data.operation ? this.data.operation : false,
      "jobOperation": this.data.jobData ? this.data.jobData : null,
      "trainingOperation": this.data.trainingData ? this.data.trainingData : null
    };

    this.commonService.verifyOTP(requestObj).subscribe((response) => {
      console.log('data and response', this.data, response);
      if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'OTP Verificaiton', 'OTP Verified, Logged in Successfully');
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.userData));

        this.dataStorage.globalIsLoggedInUser = true;
        this.dataStorage.globalLoggedInUserData = response.userData;

        setTimeout(() => {
          if (this.dataStorage.globalLoggedInUserData.userId != "") {
            var data = { userId: this.dataStorage.globalLoggedInUserData.userId, userType: MyAppHttpService.CHAT_TYPES.RI };
            this.wsService.invokeWebSocketFunction(data, 'update');
            console.log('firing websocket in otp');
          }
        }, 2000);

        if(this.router.url.includes(MyAppHttpService.PathInformation.TRAINING_DETAILS.PATH)) {
          response.trainingData = this.data.trainingData;
        }

        this.onModalDismiss({ statusCode: response.statusCode, response: response });
        console.log('router url: ', this.router.url);
        setTimeout(() => {
          let re = 'job-details'; 
          if(this.router.url == MyAppHttpService.PathInformation.JOBS.PATH || this.router.url.includes(MyAppHttpService.PathInformation.TRAININGS.PATH) || this.router.url.includes(MyAppHttpService.PathInformation.TRAINING_DETAILS.PATH) || (this.router.url.indexOf(re) != -1)) {

          }
          else {
            // this.router.navigate([MyAppHttpService.PathInformation.MY_PROFILE.PATH]);

            // if(response.isProfileInComplete == true) {
            //   this.router.navigate([MyAppHttpService.PathInformation.MY_PROFILE.PATH]);
            // }
            // else if(response.isInterviewTaken == false) {
            //   this.router.navigate([MyAppHttpService.PathInformation.SETUP_INTERVIEW.PATH]);
            // }
            // else {
              this.router.navigate([MyAppHttpService.PathInformation.JOBS.PATH]);
            // }
          } 
          
          
        }, 1000);
        // this.commonService.getTotalInterviewsCount();
        console.log('total interview count at 191: ', this.data.totalInterviewsCount, this.data, response);
        if (this.data.jobData && this.data.operation) {
          if (response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
            this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Apply Job', 'Job applied successfully');
          }
          else if (response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
          }
          else if (response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.JOB_APPLY_INACTIVE) {
            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', "Cannot apply to inactive job");
          }
        }

      }
      else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'OTP Verificaiton', 'OTP Expired');
      }
      else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SERVER_ERROR) {
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'OTP Verificaiton', 'Invalid OTP');
      }
      else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.USER_NOT_EXISTS) {
        console.log('user not exists', response);
        // this.commonService.showToast(MyAppHttpService.ToastType.WARNING, 'OTP Verificaiton', "OTP Verified, Fill the details to Register");
        // this.onModalDismiss({statusCode: response.statusCode, mobileNumber: this.userLoginForm.value.mobileNumber, sessionId: this.sessionId});
        this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'OTP Verificaiton', 'OTP Verified, Logged in Successfully');
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.userData));

        this.dataStorage.globalIsLoggedInUser = true;
        this.dataStorage.globalLoggedInUserData = response.userData;
        setTimeout(() => {
          if (this.dataStorage.globalLoggedInUserData.userId != "") {
            var data = { userId: this.dataStorage.globalLoggedInUserData.userId, userType: MyAppHttpService.CHAT_TYPES.RI };
            this.wsService.invokeWebSocketFunction(data, 'update');
            console.log('firing websocket in otp');
          }
        }, 2000);

        // this.commonService.getTotalInterviewsCount();
        console.log('total interview count at 222: ', this.data.totalInterviewsCount, this.data, response);
        if(this.router.url.includes(MyAppHttpService.PathInformation.TRAINING_DETAILS.PATH)) {
          response.trainingData = this.data.trainingData;
        }
        this.onModalDismiss({ statusCode: response.statusCode, response: response });

        if (this.data.jobData && this.data.operation) {
          if (response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
            this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Apply Job', 'Job applied successfully');
          }
          else if (response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
          }
          else if (response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.JOB_APPLY_INACTIVE) {
            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', "Cannot apply to inactive job");
          }
        }
      }
    }, (error) => {

    });

  }


  onOTPChange(event) {
    this.userLoginForm.patchValue({ 'otp': event });
  }

  validateAndApplyJob() {
    if (this.userLoginForm.invalid) {
      this.submittedMobile = true;
    }
    else {
      this.submittedMobile = false;
    }
  }

}
