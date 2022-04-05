import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/service/common.service';
import { MyAppHttpService } from '../../../shared/service/my-app-http.service';
import { Http, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';


@Component({
    selector: 'app-int-feedback',
    templateUrl: './int-feedback.component.html',
    styleUrls: ['./int-feedback.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IntFeedbackComponent implements OnInit {

    public url: any;
    submitted: boolean;
    intFeedbackForm: FormGroup;
    data;
    feedbackGiven;
    UserType: any = 1;
    intFeedback = {
        technical: -1, analytical: 0, communication: 0, domain: 0, attitude: 0, feedback: '', interviewedSkills: '', areaOfImprovement: ''
    };

    interviewerFeedback = {
        feedback: 'Good', interviewedSkills: 'java', areaOfImprovement: 'Nothing', technical: 5, analytical: 5, communication: 5,
        domain: 1, attitude: 5
    };

    constructor(private router: Router, public activeModal: NgbActiveModal, public http: Http, private fb: FormBuilder, public dataStorage: DataStorageService,
        private commonService: CommonService,) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.url = event.url;
            }
        });
    }

    ngOnInit() {
        this.intFeedbackForm = new FormBuilder().group({
            analytical: ['', Validators.compose([Validators.required])],
            domain: ['', Validators.compose([Validators.required])],
            technical: ['', Validators.compose([Validators.required])],
            communication: ['', Validators.compose([Validators.required])],
            attitude: ['', Validators.compose([Validators.required])],
            feedback: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            areaOfImprovement: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            interviewedSkills: ['', Validators.compose([Validators.required])],
            savedInterviewedSkills: ['']
        });
        this.feedbackGiven = this.data.interviewDetails.intFeedbackBool;
        this.UserType = this.data.userType;
        console.log('Feedback given : ', this.feedbackGiven, this.UserType);

        if (this.feedbackGiven == 2) {
            setTimeout(() => {
                this.getPostedFeedback();
            }, 1);
        }
    }

    onModalDismiss(value) {
        this.activeModal.close(value)
    }

    postFeedback() {
        console.log('Form value : ', this.intFeedbackForm.value)
        if (this.intFeedbackForm.valid) {
            this.submitted = false;
            let requestData = {
                interviewId: this.data.interviewDetails.interviewId,
                interviewerFeedback: {
                    analytical: this.intFeedbackForm.value.analytical,
                    domain: this.intFeedbackForm.value.domain,
                    technical: this.intFeedbackForm.value.technical,
                    communication: this.intFeedbackForm.value.communication,
                    attitude: this.intFeedbackForm.value.attitude,
                    feedback: this.intFeedbackForm.value.feedback,
                    areaOfImprovement: this.intFeedbackForm.value.areaOfImprovement,
                    interviewedSkills: this.intFeedbackForm.value.interviewedSkills
                }
            }
            console.log('Request data : ', requestData);
            this.commonService.postIntFeedback(requestData).subscribe(response => {
                console.log('response: ', response);
                if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                    // interview.intFeedbackBool = 2;
                    let a = this.GettingSkillNamesUsingIds(this.intFeedbackForm.value.interviewedSkills);
                    console.log('interviewed skills', a, a.toString());
                    this.intFeedbackForm.controls.savedInterviewedSkills.setValue(a.toString());
                    console.log('Interviewed skills: ', this.intFeedbackForm.controls.savedInterviewedSkills);
                    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Your Feedback', 'Thank you for submitting Feedback')
                    this.onModalDismiss(true);
                }
            });
        }
        else {
            this.submitted = true;
            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Your feedback', 'Please add ratings for all categories. Feedback and Area of Improvement are mandatory and minimum 5 characters');
        }
    }

    GettingSkillNamesUsingIds(IdsList) {
        let SkillnameList: any = [];
        console.log('Ids List', IdsList);
        if (this.dataStorage.globalSkillsList.length > 0) {
          for (let i = 0; i < IdsList.length; i++) {
            for (let j = 0; j < this.dataStorage.globalSkillsList.length; j++) {
              if (IdsList[i] == this.dataStorage.globalSkillsList[j].technologyId) {
                SkillnameList.push(this.dataStorage.globalSkillsList[j].technologyDescription);
              }
            }
          }
        }
        console.log('skill names list', SkillnameList);
        return SkillnameList;
      }

    getPostedFeedback() {
        if (this.data.interviewDetails.interviewStatus == 'Completed') {
            this.commonService.getIntFeedback(this.data.interviewDetails.interviewId).subscribe(response => {
                console.log('response : ', response);
                if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                    this.intFeedback = response.interviewerFeedback;
                    // this.downloadfile();
                    this.intFeedbackForm.controls.feedback.setValue(response.interviewerFeedback.feedback);
                    this.intFeedbackForm.controls.areaOfImprovement.setValue(response.interviewerFeedback.areaOfImprovement);
                    this.intFeedbackForm.patchValue(
                        {
                          'analytical': response.interviewerFeedback.analytical,
                          'areaOfImprovement': response.interviewerFeedback.areaOfImprovement,
                          'attitude': response.interviewerFeedback.attitude,
                          'communication': response.interviewerFeedback.communication,
                          'domain': response.interviewerFeedback.domain,
                          'feedback': response.interviewerFeedback.feedback,
                          'technical': response.interviewerFeedback.technical,
                          'savedInterviewedSkills': response.interviewerFeedback.interviewedSkills ? response.interviewerFeedback.interviewedSkills : (response.interviewerFeedback.skills ? response.interviewerFeedback.skills : '')
                        }
                      );
              
                    //   this.savedIntSkills = !!response.interviewerFeedback.interviewedSkills ? response.interviewerFeedback.interviewedSkills : (!!response.interviewerFeedback.skills ? response.interviewerFeedback.skills : '');
                    //   console.log('saved int skills',this.savedIntSkills);
                }
            })
        }
    }

    downloadfile() {
        console.log('feedback', this.intFeedback);
        if (this.intFeedback) {
            let feedback: any = this.intFeedback;
            if (feedback.isReportAvailable) {
                console.log('came here', feedback.reportDownloadPath);
                // window.open(feedback.reportDownloadPath);
                // this.DownloadFilenew(feedback.reportDownloadPath);
                // this.onDownloadClick(feedback);
            }
        }
    }

    downloadReport(interview, reportType) {
        let filePath, fileName, download = false;
        if (!!interview && !!reportType) {
            console.log('came here 1', interview, reportType, interview.isAudioAvailable, interview.isVideoAvailable, interview.isReportAvailable);
            if (reportType == 'audio' && !!interview.isAudioAvailable) {
                // filePath = interview.reportDownloadPath + '&reportType=' + reportType;
                fileName = !!interview.audioFileName ? interview.audioFileName : 'Audio file';
                download = true;
            }
            else if (reportType == 'video' && !!interview.isVideoAvailable) {
                fileName = !!interview.videoFileName ? interview.videoFileName : 'Video file';
                download = true;
            }
            else if (reportType == 'report' && !!interview.isReportAvailable) {
                fileName = !!interview.reportFileName ? interview.reportFileName : 'Report file';
                download = true;
            }
            else {
                this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Download', 'Currently Unavailable');
                // this.toastCtrl.presentToast('Currently unavailable')
            }

            if (download) {
                this.onDownloadClick(interview, fileName, reportType);
            }
        }
    }

    onDownloadClick(report, fileName, reportType) {

        var requestObj = {
            Path: report.reportDownloadPath,
            title: fileName,
        };
        console.log('requestObj:', fileName, requestObj, reportType);
        // let reportType = 'report';
        // this.dataStorage.globalShowLoader = true;
        this.commonService.GettingContentType(report.reportDownloadPath + '&reportType=' + reportType).subscribe((response) => {

            var newBlob = response;
            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }
            // For other browsers: 
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            link.download = fileName;
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Report', 'downloaded successfully');
            //   this.dataStorage.globalShowLoader = false;
        }, error => {
            //   this.dataStorage.globalShowLoader = false;
            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Download', 'Currently unavailable');
        });
        console.log("Certificate file path : ", report);
    }

    // DownloadFilenew(name): void {
    //     this.getFile(name)
    //         .subscribe(fileData => {
    //             let b: any = new Blob([fileData], { type: 'application/zip' });
    //             var url = window.URL.createObjectURL(b);
    //             window.open(url);
    //         }
    //         );
    // }

    // public getFile(path: string): Observable<any> {
    //     let options = new RequestOptions({
    //         responseType:
    //             ResponseContentType.Blob
    //     });
    //     return this.http.get(path, options)
    //         .map((response: Response) => <Blob>response.blob());
    // }

}
