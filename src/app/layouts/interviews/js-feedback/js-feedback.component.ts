import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/service/common.service';
import { response } from 'express';
import { MyAppHttpService } from '../../../shared/service/my-app-http.service';


@Component({
    selector: 'app-js-feedback',
    templateUrl: './js-feedback.component.html',
    styleUrls: ['./js-feedback.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JSFeedbackComponent implements OnInit {

    public url: any;
    submitted: boolean;
    jsFeedbackForm: FormGroup;
    data;
    jsFeedback = {ratings: 0, feedback: ''};
    feedbackGiven;

    jobseekerFeedback = {feedback: 'Good', ratings: 4 };
    constructor(private router: Router, public activeModal: NgbActiveModal, private fb: FormBuilder,
        private commonService: CommonService) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.url = event.url;
            }
        });
    }

    ngOnInit() {
        this.jsFeedbackForm = new FormBuilder().group({
            ratings: ['', Validators.compose([Validators.required])],
            feedback: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });

        this.feedbackGiven = this.data.interviewDetails.jsFeedbackBool;
        console.log('Feedback given : ', this.feedbackGiven );
        if(this.feedbackGiven == 2) {
            setTimeout(() => {
                this.getPostedFeedback();
            },1);
        }
    }

    onModalDismiss(value) {
        this.activeModal.close(value);
    }

    postFeedback() {
        console.log('Form value : ', this.jsFeedbackForm.value)
        if(this.jsFeedbackForm.valid ) {
            this.submitted = false;
            let requestData = {
                interviewId: this.data.interviewDetails.interviewId,
                jsFeedback: {
                    ratings: this.jsFeedbackForm.value.ratings,
                    feedback: this.jsFeedbackForm.value.feedback
                }
            }
            console.log('Request data : ', requestData);
            this.commonService.postJSFeedback(requestData).subscribe(response => {
                console.log('response: ', response);
                if(response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Your Feedback', 'Your Feedback is saved successfully')
                    this.onModalDismiss(true);
                }
            });
        }
        else {
            this.submitted = true;
            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Your feedback', 'Please add rating and feedback comments(minimum 5 characters)');
        }
    }

    getPostedFeedback() {
        if(this.data.interviewDetails.interviewStatus == 'Completed') {
            this.commonService.getJSFeedback(this.data.interviewDetails.interviewId).subscribe(response => {
                console.log('response : ', response);
                if(response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                    this.jsFeedback = response.jsFeedback;
                    this.jsFeedbackForm.controls.feedback.setValue(response.jsFeedback.feedback);
                }
            })
        }
    }
}
