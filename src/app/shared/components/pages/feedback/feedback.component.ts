import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { MyAppHttpService } from '../../../service/my-app-http.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent implements OnInit {

  public url: any;
  submitted: boolean;
  leaveMessageForm: FormGroup;

  // validation_messages = {
  //   fullName: [
  //       { type: 'required', message: 'ERRORS.FULLNAME.REQUIRED.LABEL' },
  //       { type: 'pattern', message: 'ERRORS.FULLNAME.PATTERN.LABEL' },
  //       { type: 'minLength', message: 'ERRORS.FULLNAME.MINLENGTH.LABEL' },
  //       { type: 'maxLength', message: 'ERRORS.FULLNAME.MAXLENGTH.LABEL' }
  //   ],
  //   emailId: [
  //       { type: 'required', message: 'ERRORS.EMAIL.REQUIRED.LABEL' },
  //       { type: 'email', message: 'ERRORS.EMAIL.PATTERN.LABEL' },
  //       { type: 'pattern', message: 'ERRORS.EMAIL.PATTERN.LABEL' },
  //       { type: 'minLength', message: 'ERRORS.EMAIL.MINLENGTH.LABEL' },
  //       { type: 'maxLength', message: 'ERRORS.EMAIL.MAXLENGTH.LABEL' }
  //   ],
  //   // message: [
  //   //     { type: 'required', message: 'ERRORS.MESSAGE.REQUIRED.LABEL' },
  //   //     { type: 'pattern', message: 'ERRORS.MESSAGE.PATTERN.LABEL' }
  //   // ]
  // };

  validation_messages = {
    fullName: [
      { type: 'required', message: 'Full name is required' },
      { type: 'pattern', message: 'Full name is invalid. Enter only characters.' }
  ],
  emailId: [
      { type: 'required', message: 'Email Id is required' },
      { type: 'email', message: 'Please enter valid Email Id' },
      { type: 'pattern', message: 'Please enter valid Email Id' }
  ],
    // message: [
    //     { type: 'required', message: 'ERRORS.MESSAGE.REQUIRED.LABEL' },
    //     { type: 'pattern', message: 'ERRORS.MESSAGE.PATTERN.LABEL' }
    // ]
  };

  constructor(private router: Router, public activeModal: NgbActiveModal, private fb: FormBuilder,
    private commonService: CommonService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }


  ngOnInit() {
    this.leaveMessageForm = this.fb.group({
      fullName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.NAME)])],
      emailId: ['', Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.EMAIL)])],
      message: [''],
      reCaptcha: ['', Validators.compose([Validators.required])]
    });
  }

  onModalDismiss(){
    this.activeModal.close();
    //this.dialogRef.close();
    //this.modalRef.dismiss();
  }

  validateAndSubmit() {
    if(this.leaveMessageForm.invalid) {
      this.submitted = true;
      return false;
    }
    else {
      this.submitted = false;
    }

    
    var requestObj = {
      "fullName": this.leaveMessageForm.value.fullName,
      "emailId": this.leaveMessageForm.value.emailId,
      "message": this.leaveMessageForm.value.message
  };


  this.commonService.leaveMessage(requestObj).subscribe(success =>{
      if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
          this.leaveMessageForm.reset();
          this.onModalDismiss();
          this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Leave Message', success.statusMessage);

      }
      else{
        
      }
   }, error =>{

   });
  }

}
