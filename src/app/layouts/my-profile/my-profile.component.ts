import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../shared/service/common.service';
import { environment } from '../../../environments/environment';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyProfileComponent implements OnInit {
  currDiv: string;
  activeTab = 'step1';
  myProfileForm: FormGroup;
  // @ViewChild('tabSet') tabSet:NgbTabset;
  userData: any;
  experiences: any;
  noticePeriodData = [];
  currentCTCData = [];
  expectedCTCData = [];
  yearsList: any = [];
  monthsList: any = [];
  expyear: any;
  expmonth: any;
  uResume: any;
  resume: any = '';
  submitted: boolean;
  userType = 0;
  showBasicDet = true;
  showAdditionalDet: boolean;
  resumePath: any;
  files: any;
  availableSlots: any = [];
  status: any;
  checkboxvalue: string;
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  curCTC: any;
  expCTC: any;
  jCDuration: any = 0;
  disableJobSelectBox: boolean;
  changingFreelancing: boolean;
  changingAddFreelancing: boolean;
  employed: any;
  resumeError: boolean;
  resumeErrorText: string;
  currentLoc: any;
  preferredLoc: any;

  validation_messages = {
    'userName': [
      { type: 'pattern', message: 'Username is not valid. Enter only characters.'},
    ],
    'emailId': [
      { type: 'pattern', message: 'Please enter valid Email Id'},
    ],
    'linkedIn': [
      { type: 'pattern', message: 'Please enter valid Linkedin profile url.'},
    ],
    'github': [
      { type: 'pattern', message: 'Please enter valid Github profile url.'},
    ],
    'qualification': [
      { type: 'pattern', message: 'Please enter valid format'},
    ],
    'previousCompanies': [
      { type: 'pattern', message: 'Please enter valid format'},
    ],
    'currentCompany': [
      { type: 'pattern', message: 'Please enter valid format'},
    ],
    'preferredCompany': [
      { type: 'pattern', message: 'Please enter valid format'},
    ],
  };

  myPlanDetails = {
    planName: 'Standard', expiringIn: 3, remainingInterviews: 7, remainingDays: 3,
    benefits: [
      '6 Interviews for 180 days with Best Interviewers.', '30% discount on Personalised Training',
      'Profile Highlighters for employers', 'Detailed Reports and Recommendations'
    ]

  }

  linkedInPrefixUrl = 'https://www.linkedin.com/in/rockinterview';
  githubPrefixUrl = 'https://www.github.com/rockinterview'

  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService,
    public fb: FormBuilder, public commonService: CommonService, private router: Router) {

    // this.getUserInfo();
    this.userType = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).userType : '';
  }


  ShowDiv(divVal: string) {
    this.currDiv = divVal;
  }


  step1(activeTab) {
    this.activeTab = activeTab;
  }
  navbar = false;
  myAccount = {
    basicDetails: true,
    additionalDetails: false
  }

  step2(activeTab) {
    this.activeTab = activeTab;
  }
  tab: any = 'tab2';

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data.title);
    this.colorPicker.setColorScheme('color-2');

    for (let i = 0; i <= 40; i++) {
      this.yearsList.push(i);
    }

    for (let j = 0; j <= 11; j++) {
      this.monthsList.push(j);
    }

    this.getUserInfo();
    this.getMasterData();
    this.initialiseForm();
    console.log('Global skills: ', this.dataStorage.globalSkillsList);
  }

  initialiseForm() {
    console.log('User data : ', this.userData);
    this.myProfileForm = this.fb.group({
      userName: [!!this.userData ? this.userData.userName : '', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.NAME)])],
      emailId: [!!this.userData ? this.userData.emailId : '', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.EMAIL)])],
      mobileNumber: [!!this.userData ? this.userData.phone : '', Validators.compose([Validators.required])],
      qualification: [!!this.userData ? this.userData.qualification : '', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.QUALIFICATION)])],
      previousCompanies: [!!this.userData ? this.userData.previousCompanies : '', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.PREVIOUS_COMPANY)])],
      currentCompany: [!!this.userData ? this.userData.currentCompany : '', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.CURRENT_COMPANY)])],
      preferredCompany: [!!this.userData ? this.userData.preferredCompany : '', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.PREVIOUS_COMPANY)])],


      // experience: [''],
      years: [''],
      months: [''],
      technologies: [''],
      resume: [],
      availableTimeSlots: [''],
      isMorning: [],
      isAfternoon: [],
      isEvening: [],
      isEmployed: [],
      JAPValue: [],
      freelancing: [],
      giveTraining: [],
      takeTraining: [],
      addFreelancing: [],
      jobChange: [false],
      jobChangeDuration: [],
      currentCTC: [],
      expectedCTC: [],
      //qualification: [],
      //previousCompanies: [],
      //currentCompany: [],
      //preferredCompany: [],
      currentLocation: [],
      preferredLocation: [],
      designation: [],
      linkedIn:[!!this.userData ? this.userData.linkedIn : '', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.LINKEDIN)])],
      github:[!!this.userData ? this.userData.github : '', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.GITHUB)])],
      jap: []
    });

    // this.myProfileForm.controls.isEmployed.valueChanges.subscribe((valueChanged) => {
    //   console.log('Value Changed : ', valueChanged);
    //   this.showAdditionalDet = true;
    //   if (valueChanged == 2) {
    //     if (!this.myProfileForm.controls.jobChange.value) {
    //       this.myProfileForm.controls.jobChangeDuration.reset();
    //       this.myProfileForm.controls.jobChange.setValue(false);
    //     }
    //     else {
    //       //   this.myProfileForm.controls.jobChangeDuration.reset();
    //       // this.myProfileForm.controls.jobChange.setValue(false);
    //     }

    //     // this.jCDuration= 1;
    //     // this.myProfileForm.controls.jobChange.reset(1);
    //     // this.disableJobSelectBox = true;
    //     // this.displayJobSelectBox = true;
    //     // this.myProfileForm.controls.jobChangeDuration.disable();

    //   }
    //   else {
    //     // this.disableJobSelectBox = false;
    //     // this.myProfileForm.controls.jobChangeDuration.enable();
    //     this.myProfileForm.controls.jobChange.reset(true);
    //     // this.displayJobSelectBox = false;
    //     // this.myProfileForm.controls.jobChangeDuration.reset();
    //     // this.jCDuration= 1;
    //     // this.myProfileForm.controls.jobChangeDuration.disable();
    //   }
    // });

    /*
    this.myProfileForm.controls.jobChange.valueChanges.subscribe((valueChanged) => {
      console.log('Value changed : ', valueChanged, this.myProfileForm.controls.isEmployed.value, this.employed);
      if (valueChanged == true) {
        // this.displayJobSelectBox = false;

        // this.myProfileForm.controls.jobChangeDuration.setValue(1);
        if (this.myProfileForm.controls.isEmployed.value == 1) {
          this.jCDuration = 1;
          this.myProfileForm.controls.jobChangeDuration.setValue(1);
          this.myProfileForm.controls.jobChangeDuration.disable();
        }
        else {
          this.myProfileForm.controls.jobChangeDuration.enable();
          this.jCDuration = !!this.userData.noticePeriod ? JSON.parse(this.userData.noticePeriod) : '0';
          this.myProfileForm.controls.jobChangeDuration.setValue(this.jCDuration);
          // console.log('jc dur', this.jCDuration);
        }
      }
      else {
        // this.displayJobSelectBox = true;
        this.jCDuration = 0;
        this.myProfileForm.controls.jobChangeDuration.reset();
        this.myProfileForm.controls.jobChangeDuration.disable();
      }
    });
    */

    this.myProfileForm.controls.jobChange.valueChanges.subscribe(valueChanged => {
      if(valueChanged == false) {
        this.myProfileForm.controls.jobChangeDuration.reset(0);
      }
    })

    this.myProfileForm.controls.addFreelancing.valueChanges.subscribe((valueChanged) => {
      // console.log('basic freelancing : ', valueChanged);

      if (!this.changingAddFreelancing) {
        this.changingFreelancing = true;
        if (valueChanged == true) {
          this.myProfileForm.controls.freelancing.reset(true);
        }
        else {
          this.myProfileForm.controls.freelancing.reset(false);
        }
      }
      else {
        this.changingFreelancing = false;
      }

      this.changingAddFreelancing = false;

    });

    this.myProfileForm.controls.freelancing.valueChanges.subscribe((valueChanged) => {
      // console.log('add freelancing : ', valueChanged);

      if (!this.changingFreelancing) {
        this.changingAddFreelancing = true;
        if (valueChanged == true) {
          this.myProfileForm.controls.addFreelancing.reset(true);
        }
        else {
          this.myProfileForm.controls.addFreelancing.reset(false);
        }
      }
      else {
        this.changingAddFreelancing = false;
      }

      this.changingFreelancing = false;

    });
  }

  //sai

//   nospecificcharacter(event)
//   {
//     let charCode = (event.which) ? event.which : event.keyCode;
//     if (charCode > 8 || charCode <= 47 || charCode > 57 || charCode <= 126)
//     {
//       return false
//     }
//     if(charCode == 47 || charCode == 58)
//     {
//       return false
//     }
//     else if(charCode < 47)
//     {
//       return false
//     }
    
//     else{
//       return true
//   }
// }

  employedValueChange(valueChanged) {
    console.log('value changed', valueChanged, this.myProfileForm.controls.isEmployed.value);
    this.showAdditionalDet = true;
    this.employed = JSON.parse(valueChanged);
    // console.log('employed : ', this.employed);
    this.myProfileForm.controls.isEmployed.setValue(valueChanged);
    // if (valueChanged == 2) {
    //   if (!!this.userData.jobChange || this.myProfileForm.controls.jobChange.value) {
    //     // if(this.userData.jobChange) {
    //     if (this.userData.jobChange == 2) {
    //       this.myProfileForm.controls.jobChange.setValue(true);
    //     }
    //     else {
    //       this.myProfileForm.controls.jobChange.setValue(false);
    //       // this.myProfileForm.controls.jobChangeDuration.disable();
    //     }
    //     // }

    //     this.myProfileForm.controls.jobChangeDuration.enable();
    //     this.jCDuration = JSON.parse(this.userData.noticePeriod);
    //     this.myProfileForm.controls.jobChangeDuration.setValue(this.userData.noticePeriod);
    //   }
    //   else {
    //     this.myProfileForm.controls.jobChangeDuration.reset();
    //     this.myProfileForm.controls.jobChange.setValue(false);
    //   }

    //   // this.jCDuration= 1;
    //   // this.myProfileForm.controls.jobChange.reset(1);
    //   // this.disableJobSelectBox = true;
    //   // this.displayJobSelectBox = true;
    //   // this.myProfileForm.controls.jobChangeDuration.disable();

    // }
    // else {
    //   // this.disableJobSelectBox = false;
    //   // this.myProfileForm.controls.jobChangeDuration.enable();

    //   this.myProfileForm.controls.jobChange.reset(true);

    //   // this.displayJobSelectBox = false;
    //   this.myProfileForm.controls.jobChangeDuration.setValue(1);
    //   this.jCDuration = 1;
    //   this.myProfileForm.controls.jobChangeDuration.disable();

    //   this.userData.jobChange = false;
    //   this.userData.noticePeriod = 0;
    // }
  }

  getUserInfo() {
    if (navigator.onLine) {
      this.commonService.getUserProfileInfo().subscribe(response => {
        console.log('User profile response : ', response.userDetails);
        if (response && response.statusCode == 200) {
          this.userData = response.userDetails;
          if (!!this.userData) {
            if(this.userData.currentLocation == null){
              this.userData.currentLocation = '';
            }
            if(this.userData.preferredLocation == null){
              this.userData.preferredLocation = '';
            }
            this.myProfileForm.controls.userName.setValue(this.userData.userName);
            this.myProfileForm.controls.emailId.setValue(this.userData.emailId);
            this.myProfileForm.controls.mobileNumber.setValue(this.userData.phone);
            this.convertInterestedInFromStringtoBool(this.userData.freelancing, 'freelancing');
            this.convertInterestedInFromStringtoBool(this.userData.giveTraining, 'giveTraining');
            this.convertInterestedInFromStringtoBool(this.userData.takeTraining, 'takeTraining');
            this.convertInterestedInFromStringtoBool(this.userData.jobChange, 'jobChange');
            this.convertInterestedInFromStringtoBool(this.userData.employed, 'employed');
            this.convertInterestedInFromStringtoBool(this.userData.jap, 'jap');
            // this.myProfileForm.controls.isEmployed.setValue(this.userData.employed);

            // this.myProfileForm.controls.giveTraining.setValue(this.userData.giveTraining);
            // this.myProfileForm.controls.takeTraining.setValue(this.userData.takeTraining);
            // this.myProfileForm.controls.addFreelancing.setValue(this.userData.freelancing);
            // this.myProfileForm.controls.freelancing.setValue(this.userData.freelancing);
            // this.myProfileForm.controls.jobChange.setValue(this.userData.jobChange);
            this.myProfileForm.controls.currentCTC.setValue(this.userData.currentCtc ? this.userData.currentCtc : '');
            this.myProfileForm.controls.expectedCTC.setValue(this.userData.expectedCtc ? this.userData.expectedCtc: '');
            this.myProfileForm.controls.designation.setValue(this.userData.designation);
            this.myProfileForm.controls.currentCompany.setValue(this.userData.currentCompany);
            this.myProfileForm.controls.currentLocation.setValue(this.userData.currentLocation ? this.userData.currentLocation : '');
            this.myProfileForm.controls.preferredCompany.setValue(this.userData.preferredCompany ? this.userData.preferredCompany : '');
            this.myProfileForm.controls.preferredLocation.setValue(this.userData.preferredLocation);
            this.myProfileForm.controls.previousCompanies.setValue(this.userData.prevCompanies);
            this.myProfileForm.controls.jobChangeDuration.setValue(this.userData.noticePeriod);
            this.myProfileForm.controls.qualification.setValue(this.userData.highestDegree);
            this.myProfileForm.controls.linkedIn.setValue(this.userData.linkedIn ? this.userData.linkedIn : '');
            this.myProfileForm.controls.github.setValue(this.userData.github ? this.userData.github : '');

            this.employed = this.userData.employed;
            

            if (this.userData.freelancing) {
              if (this.userData.freelancing == 2) {
                this.myProfileForm.controls.addFreelancing.setValue(true);
              }
              else {
                this.myProfileForm.controls.addFreelancing.setValue(false);
              }
            }

            if (this.userData.jobChange) {
              if (this.userData.jobChange == 2) {
                this.myProfileForm.controls.jobChange.setValue(true);
              }
              // else if (this.userData.jobChange == 1 && this.employed == 1) {
                // this.myProfileForm.controls.jobChange.setValue(true);
                // this.myProfileForm.controls.jobChangeDuration.setValue(1);
                // this.jCDuration = 1;
                // this.myProfileForm.controls.jobChangeDuration.disable();
              // }
              else {
                this.myProfileForm.controls.jobChange.setValue(false);
              }
            }

            this.jCDuration = JSON.parse(this.userData.noticePeriod);
            if (this.userData.experience) {
              this.expyear = Math.floor(this.userData.experience / 12);
              this.expmonth = this.userData.experience % 12;
              console.log('Experience : ', this.expyear, this.expmonth);
              this.myProfileForm.controls.years.setValue((this.expyear || this.expyear == 0) ? this.expyear: '');
              this.myProfileForm.controls.months.setValue(this.expmonth ? this.expmonth: '');
            }
            if (!!this.userData.technologies) {
              let tech = this.userData.technologies.map(x => x.id.toString());
              console.log('tech: ', tech);
              setTimeout(() => {
                this.myProfileForm.controls.technologies.setValue(tech);
              }, 300);

            }
          }
          this.uResume = this.userData.resumePath;
          if (this.userData.resumePath) {
            let resume = this.userData.resumePath;
            this.resume = resume.substring(resume.lastIndexOf('/') + 1);
          }
          this.curCTC = this.userData.currentCtc;
          this.expCTC = this.userData.expectedCtc;
          if(this.userData.currentLocation != null){
          this.currentLoc = this.userData.currentLocation;
          } else {
            this.currentLoc = '';
          }
          if(this.userData.preferredLocation != null){
            this.preferredLoc = this.userData.preferredLocation;
            } else {
              this.preferredLoc = '';
            }
          // this.preferredLoc = this.userData.preferredLocation;
          // this.currentLoc = this.dataStorage.globalLocationsList.filter(x => x.locationName == this.userData.currentLocation)[0].locationId;
          // this.preferredLoc = this.dataStorage.globalLocationsList.filter(x => x.locationName == this.userData.preferredLocation)[0].locationId;

          this.myProfileForm.controls.currentLocation.setValue(this.currentLoc);
          this.myProfileForm.controls.preferredLocation.setValue(this.preferredLoc);
          console.log('Locations: ', this.currentLoc, this.preferredLoc);

          if (this.userData.userType == 2) {
            this.convertAvailableSlotsFromArraytoBool(this.userData.availableSlots);
          }

        }
      });
    }
  }

  getMasterData() {
    if (navigator.onLine) {
      this.commonService.getMasterDataForEditProfile().subscribe(response => {
        if (response && response.statusCode == 200) {
          this.noticePeriodData = response.noticePeriodData;
          this.currentCTCData = response.currentCtcData;
          this.expectedCTCData = response.expectedCtcData;
        }
      });
    }
  }

  showBasicDetails() {
    this.showBasicDet = !this.showBasicDet;
  }

  showAdditionalDetails() {
    if(!this.showAdditionalDet){
      if(!this.myProfileForm.value.isEmployed){
        this.showAdditionalDet = !this.showAdditionalDet;
      }
      else
       this.employedValueChange(this.myProfileForm.value.isEmployed);
    }
    else{
      this.showAdditionalDet = !this.showAdditionalDet;
    }
  }

  // called when user clicks button to upload resume
  getFile(event) {
    this.files = event.target.files || event.srcElement.files;
    // console.log("File list length : ", this.files.length);
    // console.log("Resume : ",this.files);
    // this.uploadResume(this.uMobile);
    // console.log("Resume upload", this.resumePath);

    let name = '';
    let fileExt = '';
    let size = 0;
    if (!!this.files) {
      name = this.files[0].name;
      fileExt = name.split('.').pop();
      size = this.files[0].size;
    }
    console.log('Files : ', this.files);
    if (this.files === undefined) {
  
    } else if (this.files.length == 0) {
      
    } else if (size == 0) {
      
    } else if (size > 2097152) {
      // this.logger.openSnackBar("Please select file less than 2 MB.", "", 3000);
      this.resumeError = true;
      this.resumeErrorText = 'Please select file less than 2 MB.';

      setTimeout(() => {
        this.resumeError = false;
      }, 4000);
     
    } else if (fileExt.toLowerCase() != 'pdf' && fileExt.toLowerCase() != 'docx' && fileExt.toLowerCase() != 'doc') {
      // this.logger.openSnackBar("Please select only pdf or word file.", "", 2000);
      this.resumeError = true;
      this.resumeErrorText = 'Please select only pdf or word file.';
      setTimeout(() => {
        this.resumeError = false;
      }, 4000);
    }
    else {
      this.resumeError = false;
      this.uploadResume();
      // return;
    }
  };

  //Method for sending resume to middleware 
  uploadResume() {

    let fileData = new FormData();
    let fileName: string = '';
    console.log('Resume : ', this.files);

    if (this.files.length > 0) {
      fileName = this.userData.phone + '_' + this.files[0].name;
      console.log('File name : ', fileName);
      fileData.append('resume', this.files[0], fileName);
    }

    let xhr = new XMLHttpRequest();
    // let resUrl = 'http://52.66.192.63:8080/rockinterviewadmin/UploadResumeServlet';
    let apiUrl = environment.apiUrl + MyAppHttpService.REQUESTS.resumeUpload;
    // console.log("URL : ",resUrl,apiUrl);
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader('token', 'anonymous');
    xhr.onload = () => {
      if (xhr.status == 200) {
        console.log('server response:   ' + xhr.response);
        let response = JSON.parse(xhr.response);
        console.log('file URL from Server:  ' + response.resumePath);
        console.log('Response after upload resume: ', response);
        this.resumePath = response.resumePath;
        console.log('Resume Path:', this.resumePath);
        this.resume = this.files[0].name;
        this.setResume(response.resumePath);

        // let successDetail = {
        //     success: true,
        //     successMessage: 'UPLOAD_RESUME_SUCCESS.LABEL'
        // };

        // this.ng4LoadingSpinnerService.hide();

        // this.dialogRef1 = this.dialog.open(DialogComponent);

        // this.dialogRef1.componentInstance.param1 = successDetail;
      }
    }

    xhr.send(fileData);
    // console.log("File data : ",xhr.send(fileData));
    // console.log("Resume    :", this.resumePath);
  }


  // Method for storing the resume url
  public setResume(fileUrl) {
    this.resumePath = fileUrl;
    // console.log("resume ", this.resumePath);
  }

  // called when Save button is clicked
  validateAndSubmit(details) {
    console.log('Details after submit : ', details, this.myProfileForm);
    let formValue = details;
    let additionalDetails = {
      giveTraining: 0, takeTraining: 0, jobChange: 0, jobChangeDuration: 0, currentCtc: '0',
      expCtc: '0', prevCompanies: '', preferredLocation: '', preferredCompany: '', availableSlots: null, freelancing: 0,
      isEmployed: 0, jap: 0,linkedIn:'', github:''
    };
    let company: boolean = false;
    if (this.myProfileForm.invalid) {
      this.submitted = true;
    } else {
      this.submitted = false;
      // if (this.details.editUser) {
      if (details.previousCompanies && details.currentCompany) {
        if (details.previousCompanies.trim() == details.currentCompany.trim()) {
          company = true
        }
        else {
          company = false;
        }
      }
      if (company) {
        // let errorDetail = {
        //   error: true,
        //   errorDetail: 'Previous companies and Current Company should not be same.'
        // };
        // this.ng4LoadingSpinnerService.hide();

        // this.dialogRef1 = this.dialog.open(DialogComponent);

        // this.dialogRef1.componentInstance.param1 = errorDetail;
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'My Profile', 'Previous companies and Current Company should not be same.')
      }
      else {
        details.availableSlots = this.convertAvailableTimesFromBooltoArray();
        // details.interestedIn = this.convertInterestedInFromBooltoArray();
        details.freelancing = this.convertInterestedInFromBooltoInteger(this.myProfileForm.controls.freelancing.value, 'freelancing');
        details.giveTraining = this.convertInterestedInFromBooltoInteger(this.myProfileForm.controls.giveTraining.value, 'giveTraining');
        details.takeTraining = this.convertInterestedInFromBooltoInteger(this.myProfileForm.controls.takeTraining.value, 'takeTraining');
        details.jobChange = this.convertInterestedInFromBooltoInteger(this.myProfileForm.controls.jobChange.value, 'jobChange');
        details.isEmployed = this.convertInterestedInFromBooltoInteger(this.myProfileForm.controls.isEmployed.value, 'employed');
        details.jap = this.convertInterestedInFromBooltoInteger(this.myProfileForm.controls.jap.value, 'jap');
        //console.log("save click", this.checkboxvalue);
        if (this.checkboxvalue == '1') {
          details.uRecommended = '1';
        } else if (this.checkboxvalue == '0') {
          details.uRecommended = '0';
        }

        if (this.status == undefined) {
          details.status = 0;
        } else {
          details.status = this.status;
        }

        //console.log("Techs after submit:", details.uTechnology);
        console.log('resumes : ', this.resumePath, this.uResume);
        if (this.resumePath == undefined) {
          // console.log("Old Resume");
          if (this.uResume == undefined) {
            // console.log("No resume from data");
            details.uResume = this.resumePath;
          }
          else {
            // console.log("resume from data : ", this.uResume);
            details.uResume = this.uResume;
          }
        }
        else {
          // console.log("New Resume");
          details.uResume = this.resumePath;
        }
        console.log('Resume : ', details.uResume);
        this.myProfileForm.value.resumePath = details.uResume;
        this.myProfileForm.value.technologies = this.myProfileForm.value.technologies.length != 0 ?
          this.myProfileForm.value.technologies : [];
        let y = !!this.myProfileForm.value.years ? (JSON.parse(this.myProfileForm.value.years) * 12) : 0;
        let m = !!this.myProfileForm.value.months ? (JSON.parse(this.myProfileForm.value.months)) : 0;
        this.myProfileForm.value.experience = y + m;

        additionalDetails.giveTraining = this.myProfileForm.value.giveTraining;
        additionalDetails.takeTraining = this.myProfileForm.value.takeTraining;
        additionalDetails.jobChange = this.myProfileForm.value.jobChange;
        additionalDetails.jobChangeDuration = this.myProfileForm.getRawValue().jobChangeDuration;
        additionalDetails.currentCtc = this.myProfileForm.value.currentCTC;
        additionalDetails.expCtc = this.myProfileForm.value.expectedCTC;
        additionalDetails.prevCompanies = this.myProfileForm.value.previousCompanies;
        additionalDetails.preferredCompany = this.myProfileForm.value.preferredCompany;
        additionalDetails.preferredLocation = this.myProfileForm.value.preferredLocation;
        additionalDetails.availableSlots = this.myProfileForm.value.availableSlots;
        additionalDetails.freelancing = this.myProfileForm.value.freelancing;
        additionalDetails.isEmployed = this.myProfileForm.value.isEmployed;
        additionalDetails.jap = this.myProfileForm.value.jap;
        additionalDetails.linkedIn=this.myProfileForm.value.linkedIn;
        additionalDetails.github=this.myProfileForm.value.github
        this.myProfileForm.value.additionalDetails = additionalDetails;



        console.log('Edit user value : ', this.myProfileForm.value);
        this.myProfileForm.value.userName = this.myProfileForm.value.userName ? this.myProfileForm.value.userName.trim() : this.myProfileForm.value.userName;
        
        this.commonService.editUserDetails(this.myProfileForm.value).subscribe(response => {
          console.log('response : ', response);
          if (response && response.statusCode == 200) {
            this.getUserInfo();
            let uData = JSON.parse(localStorage.getItem('userData'));
            console.log('udata : ', uData);
            uData.userName = this.myProfileForm.value.userName;
            this.dataStorage.globalLoggedInUserData = uData;
            localStorage.setItem('userData', JSON.stringify(uData));
            this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'My Profile', 'Profile updated successfully');
            this.router.navigate(['/']);
          }
        });


        // this.dialogRef.close(this.myProfileForm.value);
        // console.log("Details : ", details);
      }

      // } else {
      //     // console.log("Edit user details : ", details);
      //     this.dialogRef.close(details)
      // }
    }
  }

  // To convert available time slots to an array to send in request
  convertAvailableTimesFromBooltoArray() {
    let mor = this.myProfileForm.controls.isMorning.value;
    let aft = this.myProfileForm.controls.isAfternoon.value;
    let eve = this.myProfileForm.controls.isEvening.value;
    if (mor || aft || eve) {
      if (mor) {
        this.availableSlots.push('M');
      }
      if (aft) {
        this.availableSlots.push('A');
      }
      if (eve) {
        this.availableSlots.push('E');
      }
    }

    if (this.availableSlots.length == 3) {
      this.availableSlots = ['M', 'A', 'E'];
      // console.log("Available times : ",this.availableSlots);
    }
    else if(this.availableSlots.length == 0) {
      this.availableSlots = [''];
    }

    console.log('Available times slots : ', this.availableSlots);
    return this.availableSlots;
  }

  // To convert interested in fields to an array to send in request
  convertInterestedInFromBooltoInteger(bool, interestedField) {

    // console.log('Interested in values  : ', bool, interestedField);
    if (bool) {
      // if(interestedField == "freelancing"){
      //     return 2;
      // }
      // else if(interestedField == "training"){
      return 2;
    }
    else {
      return 1;
    }
    // }

  }

  // To convert available time slots from array to individual boolean from data in response
  convertAvailableSlotsFromArraytoBool(availableSlots) {
    // console.log("Available Slots : ",availableSlots);

    availableSlots.forEach(element => {
      if (element == 'M') {
        this.morning = true;
        this.myProfileForm.controls.isMorning.setValue(this.morning);
      }
      if (element == 'A') {
        this.afternoon = true;
        this.myProfileForm.controls.isAfternoon.setValue(this.afternoon);
      }
      if (element == 'E') {
        this.evening = true;
        this.myProfileForm.controls.isEvening.setValue(this.evening);
      }
    });
  }

  convertInterestedInFromStringtoBool(value, interestedField) {
    console.log("Fields and values : ", value, interestedField);
    if(value){
      if (value == 2) {
        if (interestedField == "freelancing") {
          // this.freelancingValue = true;
          this.myProfileForm.controls.freelancing.setValue(true);
          this.myProfileForm.controls.addFreelancing.setValue(true);
        }
        if (interestedField == "giveTraining") {
          // this.giveTrainingValue = true;
          this.myProfileForm.controls.giveTraining.setValue(true);
        }
        if (interestedField == "takeTraining") {
          // this.takeTrainingValue = true;
          this.myProfileForm.controls.takeTraining.setValue(true);
        }
        if (interestedField == "jobChange") {
          // this.jobChangeValue = true;
          this.myProfileForm.controls.jobChange.setValue(true);
        }
        if (interestedField == "employed") {
          this.myProfileForm.controls.isEmployed.setValue(true);
        }
        if (interestedField == "jap") {
          this.myProfileForm.controls.jap.setValue(true);
        }
      }
      // else{
      //     this.freelancingValue = false;
      //     this.giveTrainingValue = false;
      //     this.takeTrainingValue = false;
      //     this.jobChangeValue = false;
      // }
    }
  

  }

  onGetSampleClick(type){
    if(type == 'Linkedin'){
      this.myProfileForm.controls.linkedIn.patchValue(this.linkedInPrefixUrl);
    }
    else{
      this.myProfileForm.controls.github.patchValue(this.githubPrefixUrl);
    }
  }

}
