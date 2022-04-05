import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../shared/service/common.service';

@Component({
  selector: 'app-download-ebook-body',
  templateUrl: './download-ebook-body.component.html',
  styleUrls: ['./download-ebook-body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DownloadEbookBodyComponent implements OnInit {

  downloadEbookForm: FormGroup;
  submitted: boolean;

  // validation_messages = {
  //   firstName: [
  //     { type: 'required', message: 'ERRORS.FIRST_NAME.REQUIRED.LABEL' },
  //     { type: 'pattern', message: 'ERRORS.FIRST_NAME.PATTERN.LABEL' },
  //     { type: 'minLength', message: 'ERRORS.FIRST_NAME.MINLENGTH.LABEL' },
  //     { type: 'maxLength', message: 'ERRORS.FIRST_NAME.MAXLENGTH.LABEL' }
  //   ],
  //   lastName: [
  //     { type: 'required', message: 'ERRORS.LAST_NAME.REQUIRED.LABEL' },
  //     { type: 'pattern', message: 'ERRORS.LAST_NAME.PATTERN.LABEL' },
  //     { type: 'minLength', message: 'ERRORS.LAST_NAME.MINLENGTH.LABEL' },
  //     { type: 'maxLength', message: 'ERRORS.LAST_NAME.MAXLENGTH.LABEL' }
  //   ],
  //   emailId: [
  //     { type: 'required', message: 'ERRORS.EMAIL.REQUIRED.LABEL' },
  //     { type: 'email', message: 'ERRORS.EMAIL.PATTERN.LABEL' },
  //     { type: 'pattern', message: 'ERRORS.EMAIL.PATTERN.LABEL' },
  //     { type: 'minLength', message: 'ERRORS.EMAIL.MINLENGTH.LABEL' },
  //     { type: 'maxLength', message: 'ERRORS.EMAIL.MAXLENGTH.LABEL' }
  //   ],
  //   phone: [
  //     { type: 'required', message: 'ERRORS.MOBILENUMBER.REQUIRED.LABEL' },
  //     { type: 'pattern', message: 'ERRORS.MOBILENUMBER.PATTERN.LABEL' }
  //   ]
  // };

  validation_messages = {
    firstName: [
        { type: 'required', message: 'First name is required' },
        { type: 'pattern', message: 'First name is invalid. Enter only characters.' },
        // { type: 'minLength', message: 'ERRORS.FIRST_NAME.MINLENGTH.LABEL' },
        // { type: 'maxLength', message: 'ERRORS.FIRST_NAME.MAXLENGTH.LABEL' }
    ],
    lastName: [
        { type: 'required', message: 'Last name is required' },
        { type: 'pattern', message: 'Last name is invalid. Enter only characters.' },
        // { type: 'minLength', message: 'ERRORS.LAST_NAME.MINLENGTH.LABEL' },
        // { type: 'maxLength', message: 'ERRORS.LAST_NAME.MAXLENGTH.LABEL' }
    ],
    emailId: [
        { type: 'required', message: 'Email Id is required' },
        { type: 'email', message: 'Please enter valid Email Id' },
        { type: 'pattern', message: 'Please enter valid Email Id' },
        // { type: 'minLength', message: 'ERRORS.EMAIL.MINLENGTH.LABEL' },
        // { type: 'maxLength', message: 'ERRORS.EMAIL.MAXLENGTH.LABEL' }
    ],
    phone: [
        { type: 'required', message: 'Mobile number is required' },
        { type: 'pattern', message: 'Please enter valid mobile number' }
    ]
};
  constructor(private fb: FormBuilder, private commonService: CommonService) {
  }

  ngOnInit() {
    this.downloadEbookForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.NAME)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.NAME)])],
      emailId: ['', Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.EMAIL)])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.MOBILE_NUMBER)])],
      reCaptcha: ['', Validators.compose([Validators.required])]
    });
  }

  validateAndSubmit() {
    if (this.downloadEbookForm.invalid) {
      this.submitted = true;
      return false;
    }
    else {
      this.submitted = false;
    }

    var requestObj ={
      "firstName": this.downloadEbookForm.value.firstName,
      "lastName": this.downloadEbookForm.value.lastName,
      "emailId": this.downloadEbookForm.value.emailId,
      "phone": this.downloadEbookForm.value.phone
  };


  this.commonService.downloadEbook(requestObj).subscribe(success =>{
      if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
          this.downloadEbookForm.reset();
        this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Download EBook', 
        'Thank you for submitting details, you will receive Download EBook link shortly to your registered email id');
      }
      else{
        
      }
   }, error =>{

   });

  }

}
