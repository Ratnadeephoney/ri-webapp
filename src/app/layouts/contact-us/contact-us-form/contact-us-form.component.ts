import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyAppHttpService } from '../../../shared/service/my-app-http.service';
import { CommonService } from '../../../shared/service/common.service';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
    selector: 'app-contact-us-form',
    templateUrl: './contact-us-form.component.html',
    styleUrls: ['./contact-us-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactUsFormComponent implements OnInit {

    contactForm: FormGroup;
    submitted: boolean;

    // validation_messages = {
    //     firstName: [
    //         { type: 'required', message: 'ERRORS.FIRST_NAME.REQUIRED.LABEL' },
    //         { type: 'pattern', message: 'ERRORS.FIRST_NAME.PATTERN.LABEL' },
    //         { type: 'minLength', message: 'ERRORS.FIRST_NAME.MINLENGTH.LABEL' },
    //         { type: 'maxLength', message: 'ERRORS.FIRST_NAME.MAXLENGTH.LABEL' }
    //     ],
    //     lastName: [
    //         { type: 'required', message: 'ERRORS.LAST_NAME.REQUIRED.LABEL' },
    //         { type: 'pattern', message: 'ERRORS.LAST_NAME.PATTERN.LABEL' },
    //         { type: 'minLength', message: 'ERRORS.LAST_NAME.MINLENGTH.LABEL' },
    //         { type: 'maxLength', message: 'ERRORS.LAST_NAME.MAXLENGTH.LABEL' }
    //     ],
    //     emailId: [
    //         { type: 'required', message: 'ERRORS.EMAIL.REQUIRED.LABEL' },
    //         { type: 'email', message: 'ERRORS.EMAIL.PATTERN.LABEL' },
    //         { type: 'pattern', message: 'ERRORS.EMAIL.PATTERN.LABEL' },
    //         { type: 'minLength', message: 'ERRORS.EMAIL.MINLENGTH.LABEL' },
    //         { type: 'maxLength', message: 'ERRORS.EMAIL.MAXLENGTH.LABEL' }
    //     ],
    //     phone: [
    //         { type: 'required', message: 'ERRORS.MOBILENUMBER.REQUIRED.LABEL' },
    //         { type: 'pattern', message: 'ERRORS.MOBILENUMBER.PATTERN.LABEL' }
    //     ],
    //     description: [
    //         { type: 'required', message: 'ERRORS.DESCRIPTION.REQUIRED.LABEL'}
    //     ],
    //     comments: [
    //         { type: 'required', message: 'ERRORS.COMMENTS.REQUIRED.LABEL'}
    //     ]
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
        ],
        description: [
            { type: 'required', message: 'Select any option'}
        ],
        comments: [
            { type: 'required', message: 'Comments are required'}
        ]
    };

    constructor(private fb: FormBuilder, private commonService: CommonService, private dataStorage: DataStorageService) {
    }


    ngOnInit() {
        this.contactForm = this.fb.group({
            firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.NAME)])],
            lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.NAME)])],
            emailId: ['', Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.EMAIL)])],
            phone: ['', Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.MOBILE_NUMBER)])],
            description: ['', Validators.compose([Validators.required])],
            comments: [''],
            reCaptcha: ['', Validators.compose([Validators.required])]
        });
    }

    validateAndSubmit() {
        if(this.contactForm.invalid) {
            this.submitted = true;
            return false;
        }
        else {
            this.submitted = false;
        }

        var requestObj ={
            "firstName": this.contactForm.value.firstName,
            "lastName": this.contactForm.value.lastName,
            "emailId": this.contactForm.value.emailId,
            "phone": this.contactForm.value.phone,
            "category": this.contactForm.value.description,
            "comments": this.contactForm.value.comments
        };


        this.commonService.postContactUs(requestObj).subscribe(success =>{
            if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
                this.contactForm.reset();
              this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Contact Us', success.statusMessage)
            }
            else{
              
            }
         }, error =>{
      
         });


    }
}
