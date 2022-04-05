import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyAppHttpService } from '../../../service/my-app-http.service';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { CommonService } from '../../../service/common.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-user-registration',
    templateUrl: './user-registration.component.html',
    styleUrls: ['./user-registration.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserRegistrationComponent implements OnInit {

    public url: any;
    submitted: boolean;
    userRegistrationForm: FormGroup;
    experiences: [];
    showForm: boolean;
    y= 0;
    yearsList: any=[];
    monthsList: any=[];
    resume: any;
    resumePath: any = '';
    fileName: any = '';
    data;

    validation_messages = {
        userName: [
            { type: 'required', message: 'Name is required' },
            { type: 'pattern', message: 'Name is invalid. Enter only characters.' },
        ],
        emailId: [
            { type: 'required', message: 'Email Id is required' },
            { type: 'email', message: 'Please enter valid Email Id' },
            { type: 'pattern', message: 'Please enter valid Email Id' }
        ],
        mobileNumber: [
            { type: 'required', message: 'Mobile number is required' },
            { type: 'pattern', message: 'Please enter valid mobile number' }
        ],
        years: [
            {type: 'max', message: '<=40'},
            {type: 'min', message: '<=40'}
        ],
        months: [
            {type: 'max', message: '<=12'},
            {type: 'min', message: '<=12'}
        ]
        // description: [
        //     { type: 'required', message: 'Select any option'}
        // ],
        // comments: [
        //     { type: 'required', message: 'Comments are required'}
        // ]
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

        for(let i=0;i<=40;i++){
            this.yearsList.push(i);
        }

        for(let j=0;j<=11;j++){
            this.monthsList.push(j);
        }

        this.userRegistrationForm = new FormBuilder().group({
            userRole: [, Validators.compose([Validators.required])],
            userName: ['', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.ONLY_ALPHABETS), Validators.maxLength(50)])],
            emailId: ['', Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.EMAIL)])],
            mobileNumber: [this.data.mobileNumber, Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.MOBILE_NUMBER)])],
            // experience: ['',Validators.compose([])],
            technologies: ['', Validators.compose([])],
            resume: ['', Validators.compose([])],
            years: ['', Validators.compose([Validators.max(40), Validators.min(0)])],
            months: ['', Validators.compose([Validators.max(12), Validators.min(0)])],
        });

        this.userRegistrationForm.controls['userRole'].valueChanges.subscribe(data => {
            if (data) {
                this.showForm = true;
            }
        });

        this.userRegistrationForm.controls['years'].valueChanges.subscribe(data => {
            this.y = data;
            console.log('y',this.y);
        })
    }

    onModalDismiss(returnObj = {}) {
        this.activeModal.close(returnObj);
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

    getFile(event) {
        console.log("Event : ", event);
        console.log("File : ", event.target.files[0]);
        this.fileName = '';
        this.resume = event.target.files;
        let name = '';
        let fileExt = '';
        let size = 0;
        let mobile: any;
        if (!!this.resume) {
          name = this.resume[0].name;
          fileExt = name.split('.').pop();
          size = this.resume[0].size;
    
        }
        console.log("resume : ", this.resume);
        if (this.resume === undefined) {
          this.userRegistrationForm.controls['resume'].reset();
    
        } else if (this.resume.length == 0) {
          this.userRegistrationForm.controls['resume'].reset();
          this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Resume Upload", "File not selected.");
    
        } else if (size == 0) {
          this.userRegistrationForm.controls['resume'].reset();
          this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Resume Upload", "File not supported, Please select another file.");
          
    
        } else if (fileExt.toLowerCase() != "pdf" && fileExt.toLowerCase() != "docx" && fileExt.toLowerCase() != "doc") {
          this.userRegistrationForm.controls['resume'].reset();
          this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Resume Upload", "Please select only pdf or word file.");
        } else if (size > 2097152) {
          this.userRegistrationForm.controls['resume'].reset();
          this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Resume Upload", "Please select file less than 2 MB.");
        }
        // else if(!this.scheduleInterviewForm.controls['mobileNumber'].value){
        //   this.myAppService.showAlertMessage("Please enter mobile number");
        // }
        else {
            debugger;
          mobile = this.userRegistrationForm.controls['mobileNumber'].value;
          this.fileName = name;
          let fileData = new FormData();
          // let fileData : any;
          let fileName: string = '';
          console.log("Resume : ", this.resume[0]);
    
          if (this.resume.length > 0) {
            fileName = mobile + '_' + this.resume[0].name;
            // fileName = this.resume[0].name;
            console.log("File name : ", fileName);
            fileData.append("resume", this.resume[0], fileName);
          }
    
          let xhr = new XMLHttpRequest();
          let apiUrl = environment.apiUrl + MyAppHttpService.REQUESTS.resumeUpload;
          
          var accessToken = 'anonymous';
    
          xhr.open('POST', apiUrl, true);
          xhr.setRequestHeader("token", accessToken);
          xhr.onload = () => {
            if (xhr.status == 200) {
              let response = JSON.parse(xhr.response);
              this.resumePath = response.resumePath;
              console.log("Resume Path:", this.resumePath);
            }
          }
    
          xhr.send(fileData);
        }
      }

    validateAndRegister() {
        if (this.userRegistrationForm.invalid) {
            this.submitted = true;
            return false;
        }
        
        var experience = ((this.userRegistrationForm.value.years ? parseInt(this.userRegistrationForm.value.years): 0) * 12) +
        (this.userRegistrationForm.value.months ? parseInt(this.userRegistrationForm.value.months): 0);
        var requestObj = 
        {
            "sessionId": this.data.sessionId,
            "emailId": this.userRegistrationForm.value.emailId,
            "userType": this.userRegistrationForm.value.userRole,
            "technologies": this.userRegistrationForm.value.technologies ? this.userRegistrationForm.value.technologies: null,
            "currentLocation": null,
            "highestDegree": null,
            "currentCompany": null,
            "designation": null,
            "experience": experience ? experience : null,
            "resumePath": this.resumePath,
            "userName": this.userRegistrationForm.value.userName,
            "addditionalDetails": null,
            "isOtherOperationSelected": this.data.operation ? true : false,
            "jobOperation": this.data.jobData ? this.data.jobData: null,
            "trainingOperation": this.data.trainingData ? this.data.trainingData: null
         };

         this.commonService.registerUser(requestObj).subscribe((response)=>{
            if(response.statusCode  == MyAppHttpService.RESPONSE_CODES.SUCCESS){
                this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'User Registration', 'Registered Successfully');
                localStorage.setItem('token', response.token);
                localStorage.setItem('userData', JSON.stringify(response.userData));

                
        this.dataStorage.globalIsLoggedInUser = true;
        this.dataStorage.globalLoggedInUserData = response.userData;

                this.onModalDismiss(response);
                if(this.data.jobData && this.data.operation){
                    if(response.operationStatusCode ==  MyAppHttpService.RESPONSE_CODES.SUCCESS ){
                            this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Apply Job', 'Job applied successfully');
                    }
                    else if(response.operationStatusCode ==  MyAppHttpService.RESPONSE_CODES.BAD_REQUEST){
                            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
                        }
                        else if(response.operationStatusCode ==  MyAppHttpService.RESPONSE_CODES.JOB_APPLY_INACTIVE){
                            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', "Cannot apply to inactive job");
                          }
                }
            }
            else {
                this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'User Registration', 'Something went wrong!');
            }
         }, error=>{

         });


    }

    validateExperience(event, exp) {
        console.log('Event and exp : ', event, exp, event.srcElement.value);
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        // if(event.srcElement.value) {
        //     if(exp == 'y') {
        //         if(event.srcElement.value < 41){
        //             return true;
        //         }
        //         else {
        //             return false;
        //         }
        //     }
        //     else if(exp == 'm'){
        //         if(event.srcElement.value < 12){
        //             return true;
        //         }
        //         else {
        //             return false;
        //         }
        //     }
        // }

        // if (event.srcElement.value) {
        //     if (event.srcElement.value.length < 3) {
        //         let a = event.srcElement.value;
        //         let b = a.toString().split('');
        //         let c = b.map(Number);
        //         if (c.length != 0) {
        //             if (exp == 'y') {
        //                 if (c[0] <= 4) {
        //                     if(c[1] && a <= 40){
        //                         return true;
        //                     }
        //                     else{
        //                         return false;
        //                     }
                            
        //                 }
        //                 else {
        //                     return false;
        //                 }
        //             }
        //             else if(exp == 'm') {
        //                 if (c[0] <= 1 && a <= 11) {
        //                     return true;
        //                 }
        //                 else {
        //                     return false;
        //                 }
        //             }
        //         }
        //     }
        // }

        console.log('years: ', this.userRegistrationForm.value.years, this.y);
        if(this.y <= 40){
            return true;
        }
        else {
            return false;
        }


        // return true;
        console.log('years: ', this.userRegistrationForm.value.years);
    }
}