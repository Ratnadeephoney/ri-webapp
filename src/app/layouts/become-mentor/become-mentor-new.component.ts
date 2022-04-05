import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-become-mentor-new',
  templateUrl: './become-mentor-new.component.html',
  styleUrls: ['./become-mentor-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BecomeMentorNewComponent implements OnInit {
  ShowApply: boolean = false;
  ShowVerification: boolean = false;
  ShowStatus: boolean = false;
  ShowMentor: boolean = false;
  myProfileForm: FormGroup;
  userData: any;
  yearsList: any = [];
  monthsList: any = [];
  years: any = '';
  months: any = '';
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
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  resumeError: boolean;
  resumeErrorText: string;
  resumenf: boolean = false;
  companyError: boolean;
  profileData: any = null;
  uploadedResumePath: any = '';
  Availableslotserror: boolean = false;
  RoleStatus: any = 1;

  validation_messages = {
    'years': [
      { type: 'required', message: 'Field is required' },
    ],
    'months': [
      { type: 'required', message: 'Field is required' },
    ],
    'currentCompany': [
      { type: 'required', message: 'Field is required' },
      { type: 'pattern', message: 'Please enter valid company' },
      { type: 'minLength', message: 'Please enter min digits' },
      { type: 'maxLength', message: 'Please enter max digits' }
    ],
    'prevCompanies': [
      { type: 'required', message: 'Field is required' },
      { type: 'pattern', message: 'Please enter valid company' },
      { type: 'minLength', message: 'Please enter min digits' },
      { type: 'maxLength', message: 'Please enter max digits' }
    ],
    'technologies': [
      { type: 'required', message: 'Field is required' },
    ],
  };

  constructor(public dataStorage: DataStorageService, public commonService: CommonService, private router: Router) {
    this.checkStatusForPageNav();
    this.myProfileForm = new FormBuilder().group({
      'userName': [null],
      'emailId': [null],
      'mobileNumber': [null],
      'technologies': [[], Validators.required],
      'years': ['', Validators.compose([Validators.required])],
      'months': ['', Validators.compose([Validators.required])],
      'resumePath': ['', Validators.compose([])],
      'availableSlots': ['', Validators.compose([Validators.required])],
      'currentCompany': ['', Validators.compose([Validators.required])],
      'prevCompanies': ['', Validators.compose([Validators.required])],
      'isMorning': [],
      'isAfternoon': [],
      'isEvening': []
    });
    this.getprofileData();
    this.myProfileForm.controls.isMorning.valueChanges.subscribe(data => {
      console.log(data)
      if (data != null) {
        let m = this.convertAvailableTimesFromBooltoArray();
        this.myProfileForm.controls.availableSlots.setValue(m);
      }
    });
    this.myProfileForm.controls.isAfternoon.valueChanges.subscribe(data => {
      if (data != null) {
        let a = this.convertAvailableTimesFromBooltoArray();
        this.myProfileForm.controls.availableSlots.setValue(a);
      }
    });
    this.myProfileForm.controls.isEvening.valueChanges.subscribe(data => {
      if (data != null) {
        let e = this.convertAvailableTimesFromBooltoArray();
        this.myProfileForm.controls.availableSlots.setValue(e);
      }
    });
    this.myProfileForm.controls.currentCompany.valueChanges.subscribe(data => {
      if (!!data) {
        if (data == this.myProfileForm.controls.prevCompanies.value) {
          this.companyError = true;
        }
        else {
          this.companyError = false;
        }
      }
    });
    this.myProfileForm.controls.prevCompanies.valueChanges.subscribe(data => {
      if (!!data) {
        if (data == this.myProfileForm.controls.currentCompany.value) {
          this.companyError = true;
        }
        else {
          this.companyError = false;
        }
      }
    });
  }

  AddTraining(){
    this.dataStorage.FromMentor = true;
    this.router.navigate([MyAppHttpService.PathInformation.CREATE_TRAINING.PATH]);
  }

  BackToApply() {
    this.ShowMentor = false;
    this.ShowApply = true;
    this.ShowVerification = false;
    this.ShowStatus = false;
    this.submitted = false;
  }

  GoToVerification() {
    this.getprofileData();
    this.ShowMentor = false;
    this.ShowApply = false;
    this.ShowVerification = true;
    this.ShowStatus = false;
  }

  checkStatusForPageNav() {
    this.commonService.roleChangeStatus(null).subscribe((apiResponse) => {
      console.log('response of roleChangeStatus', apiResponse);
      console.log('response of roleChangeStatus', apiResponse.statusCode);
      this.RoleStatus = apiResponse.statusCode;
      if (apiResponse.statusCode == 1 || apiResponse.statusCode == 3) { // 1 or 3 is status
        if (this.dataStorage.globalLoggedInUserData.userType == 1) {
          this.ShowApply = false;
          this.ShowVerification = false;
          this.ShowStatus = true;
          this.ShowMentor = false;
        }
        // this.navCtrl.navigateRoot(['/become-mentor/mentor-role-status', apiResponse.statusCode], {});
      } else if (apiResponse.statusCode == 2) { // 2 is already mentor--approved
        this.dataStorage.globalLoggedInUserData.userType = 2;
        localStorage.setItem("userData", JSON.stringify(this.dataStorage.globalLoggedInUserData));
        this.ShowApply = false;
        this.ShowVerification = false;
        this.ShowStatus = false;
        this.ShowMentor = true;
        // this.navCtrl.navigateRoot(['/become-mentor/mentor'], {});
      } else {
        if (this.dataStorage.globalLoggedInUserData.userType == 1) {
          this.ShowApply = true;
          this.ShowVerification = false;
          this.ShowStatus = false;
          this.ShowMentor = false;
        }
      }

    }, error => {
      console.log(error);
    }, () => {
    })

  }

  convertAvailableTimesFromBooltoArray() {
    let mor = this.myProfileForm.controls.isMorning.value;
    let aft = this.myProfileForm.controls.isAfternoon.value;
    let eve = this.myProfileForm.controls.isEvening.value;
    if (mor || aft || eve) {
      this.Availableslotserror = false;
      this.availableSlots = [];
      if (mor) {
        let m = this.availableSlots.filter(x => x == 'M');
        console.log(m.length);
        if (m.length == 0) {
          this.availableSlots.push('M');
        }
      }
      else {
        console.log(this.availableSlots);
        this.availableSlots = this.availableSlots.filter(x => x != 'M');
        console.log(this.availableSlots);
      }
      if (aft) {
        let m = this.availableSlots.filter(x => x == 'A');
        console.log(m.length);
        if (m.length == 0) {
          this.availableSlots.push('A');
        }
      }
      else {
        this.availableSlots = this.availableSlots.filter(x => x != 'A');
      }
      if (eve) {
        let m = this.availableSlots.filter(x => x == 'E');
        console.log(m.length);
        if (m.length == 0) {
          this.availableSlots.push('E');
        }
      }
      else {
        this.availableSlots = this.availableSlots.filter(x => x != 'E');
      }
    }
    else {
      this.availableSlots = [];
    }

    if (this.availableSlots.length == 3) {
      this.availableSlots = ['M', 'A', 'E'];
      // console.log("Available times : ",this.availableSlots);
    }
    else if (this.availableSlots.length == 0) {
      this.availableSlots = [];
    }

    console.log('Available times slots : ', this.availableSlots);
    return this.availableSlots;
  }

  ngOnInit(): void {
    for (let i = 0; i <= 40; i++) {
      this.yearsList.push(i);
    }

    for (let j = 0; j <= 11; j++) {
      this.monthsList.push(j);
    }

  }

  getprofileData() {
    this.commonService.getUserProfileInfo().subscribe((apiResponse) => {
      console.log('User profile data', apiResponse);

      if (MyAppHttpService.isValidInput(apiResponse)) {
        let userdetails = JSON.parse(JSON.stringify(apiResponse.userDetails));
        console.log('****** username ', userdetails)
        this.profileData = userdetails;
        this.prepareFormData(userdetails);

      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }

  prepareFormData(userdetails) {
    this.resume = !!userdetails.resumePath ? userdetails.resumePath.substring(userdetails.resumePath.lastIndexOf('/') + 1) : '';
    this.years = this.getYears(userdetails.experience);
    this.months = this.getMonths(userdetails.experience);
    // console.log('Fetched data variables: ', this.resumeName, this.years, this.months);
    let tech = [];
    // if (!!userdetails.technologies) {
    //   userdetails.technologies.forEach(element => {
    //     tech.push(this.dataStorage.globalSkillsList.filter(tech => tech.technologyId == element.id)[0].technologyId.toString());
    //   });
    // }
    // let selectedskillids = [];
    let selectedIds = [];
    if (!!userdetails.technologies) {
      if (userdetails.technologies.length != 0) {
        for (let i = 0; i < userdetails.technologies.length; i++) {
          // selectedskillids.push(userdetails.technologies[i].id.toString());
          let newobj: any = {};
          // newobj.technologyId = userdetails.technologies[i].id;
          selectedIds.push(userdetails.technologies[i].id);
          // newobj.technologyDescription = userdetails.technologies[i].name;
          // selectedskillids.push(newobj);
        }
        if (selectedIds.length != 0) {
          // userdetails.technologies = selectedskillids;
          console.log('data');
          userdetails.technologies = selectedIds;
        }
      }
    }
    else {
      userdetails.technologies = [];
    }


    console.log('tech: ', userdetails, this.years, this.months);
    if(this.years == -1 || this.years == 0){
      this.years = '';
    }
    if(this.months == -1 || this.months == 0){
      this.months = '';
    }
    this.availableSlots = userdetails.availableSlots;
    this.convertAvailableSlotsFromArraytoBool(userdetails.availableSlots);
    this.uploadedResumePath = userdetails.resumePath
    this.myProfileForm.patchValue(
      {
        'emailId': userdetails.emailId,
        'userName': userdetails.userName,
        'mobileNumber': userdetails.phone,
        'years': this.years.toString(),
        'months': this.months.toString(),
        'availableSlots': this.availableSlots,
        'currentCompany': userdetails.currentCompany,
        'prevCompanies': userdetails.prevCompanies,
        'technologies': userdetails.technologies.map(String),
        'resumePath': '',
      }

    );
    console.log('aform data after patching: ', this.myProfileForm.value);
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

  getYears(months: string): number {
    if (MyAppHttpService.isValidInput(months) && months != '-1') {
      return (parseInt(months) / 12 | 0);
    } else {
      return -1;
    }
  };

  getMonths(months): number {
    if (MyAppHttpService.isValidInput(months) && months != '-1') {
      return parseInt(months) % 12;
    } else {
      return -1;
    }
  };

  validateAndSubmit(value) {
    console.log('value', value);
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

      // setTimeout(() => {
      //   this.resumeError = false;
      // }, 4000);

    } else if (fileExt.toLowerCase() != 'pdf' && fileExt.toLowerCase() != 'docx' && fileExt.toLowerCase() != 'doc') {
      // this.logger.openSnackBar("Please select only pdf or word file.", "", 2000);
      this.resumeError = true;
      this.resumeErrorText = 'Please select only pdf or word file.';
      // setTimeout(() => {
      //   this.resumeError = false;
      // }, 4000);
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
      fileName = this.profileData.phone + '_' + this.files[0].name;
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
        this.resumeError = false;
        console.log('server response:   ' + xhr.response);
        let response = JSON.parse(xhr.response);
        console.log('file URL from Server:  ' + response.resumePath);
        console.log('Response after upload resume: ', response);
        this.resumePath = response.resumePath;
        this.uploadedResumePath = response.resumePath;
        this.resumenf = false;
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

  saveProfile() {
    console.log('form data from save', this.myProfileForm);

    if (!!this.uploadedResumePath) {
      this.resumenf = false;
    }
    else {
      this.resumenf = true;
    }
    if (this.myProfileForm.value.currentCompany && this.myProfileForm.value.prevCompanies) {
      if (this.myProfileForm.value.currentCompany == this.myProfileForm.value.prevCompanies) {
        this.companyError = true;
      }
      else {
        this.companyError = false;
      }
    }

    if (this.myProfileForm.value.availableSlots == []) {
      this.Availableslotserror = true;
    } else {
      this.Availableslotserror = false;
    }

    let apiRequest = this.DividingFields();
    console.log('request data', apiRequest, this.resumeError);

    // let requestData = {
    //   userName: this.myProfileForm.value.userName,
    //   emailId: this.myProfileForm.value.emailId,
    //   mobileNumber: this.myProfileForm.value.mobileNumber
    // }

    if (this.myProfileForm.valid && !this.resumeError && !this.companyError && this.myProfileForm.value.technologies.length != 0 && this.resumenf == false) {
      this.submitted = false;
      let apiRequest = this.DividingFields();
      console.log('request data', apiRequest);
      console.log('SAVE REQUEST DATA', apiRequest);
      //save profile Data
      this.commonService.editUserDetails(apiRequest).subscribe((apiResponse) => {
        console.log('response of edit profile', apiResponse);
        if (apiResponse.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
          this.requestRoleChange();
        }
      }, error => {
        console.log(error);
      }, () => {
      });
    }
    else {
      this.submitted = true;
    }

  }

  requestRoleChange() {
    let apiRequest = null;
    this.commonService.requestRoleChange(apiRequest).subscribe((apiResponse) => {
      console.log('response of requestRoleChange', apiResponse);
      this.RoleStatus = 1;
      this.ShowApply = false;
      this.ShowVerification = false;
      this.ShowStatus = true;
      this.ShowMentor = false;
      // this.navCtrl.navigateForward(['/become-mentor/mentor-role-status', apiResponse.statusCode], {});
    }, error => {
      console.log(error);
    }, () => {
    })
  }

  // Preparing Data for Update
  DividingFields() {
    let profileformdata = this.myProfileForm.getRawValue();
    let newformdata = JSON.parse(JSON.stringify(profileformdata));

    // Creating additional details object
    let additionalDetailsobj: any = {};
    additionalDetailsobj.availableSlots = newformdata.availableSlots;
    additionalDetailsobj.expCtc = this.profileData.expectedCtc;
    additionalDetailsobj.currentCtc = this.profileData.currentCtc;
    additionalDetailsobj.freelancing = this.profileData.freelancing;
    additionalDetailsobj.giveTraining = this.profileData.giveTraining;
    additionalDetailsobj.isEmployed = this.profileData.employed;
    additionalDetailsobj.jobChange = this.profileData.jobChange;
    additionalDetailsobj.jobChangeDuration = this.profileData.noticePeriod;
    additionalDetailsobj.preferredCompany = this.profileData.preferredCompany;
    additionalDetailsobj.preferredLocation = this.profileData.preferredLocation;
    additionalDetailsobj.prevCompanies = newformdata.prevCompanies;
    additionalDetailsobj.takeTraining = this.profileData.takeTraining;


    //Checkboxes data
    // if (this.profileData.freelancing == true) {
    //   additionalDetailsobj.freelancing = 2;
    // } else {
    //   additionalDetailsobj.freelancing = 1;
    // }

    // if (this.profileData.isEmployed == true) {
    //   additionalDetailsobj.isEmployed = 2;
    // } else {
    //   additionalDetailsobj.isEmployed = 1;
    // }

    // if (this.profileData.JAPValue == true) {
    //   additionalDetailsobj.JAPValue = 2;
    // } else {
    //   additionalDetailsobj.JAPValue = 1;
    // }

    // if(!!newformdata.technologies) {
    //   if (newformdata.technologies != []) {
    //     let newtechs: any = [];
    //     for (let i = 0; i < newformdata.technologies.length; i++) {
    //       newtechs.push(newformdata.technologies[i].technologyId);
    //     }
    //     if (newtechs.length != 0) {
    //       newformdata.technologies = newtechs;
    //     }
    //   }
    // }
    newformdata.technologies = this.myProfileForm.value.technologies.length != 0 ? this.myProfileForm.value.technologies : [];


    //Exp data
    newformdata.experience = this.getExperienceMonthsWithInputs(newformdata.years, newformdata.months);

    // resume data
    newformdata.resumePath = !!this.uploadedResumePath ? this.uploadedResumePath : this.profileData.resumePath;

    // arranging data in additional details object
    newformdata.additionalDetails = additionalDetailsobj;
    // newformdata.availableTimeSlots = newformdata.availableSlots;
    newformdata.qualification = this.profileData.highestDegree;
    newformdata.designation = this.profileData.designation;
    newformdata.currentLocation = this.profileData.currentLocation;

    newformdata.highestDegree = this.profileData.highestDegree;
    newformdata.designation = this.profileData.designation;
    newformdata.currentLocation = this.profileData.currentLocation;
    newformdata.qualification = this.profileData.highestDegree;

    newformdata.source = 'WEB';
    newformdata.userDevice = null;

    // Deleting fields
    delete newformdata.availableSlots;
    delete newformdata.expCtc;
    delete newformdata.currentCtc;
    delete newformdata.freelancing;
    delete newformdata.giveTraining;
    delete newformdata.isEmployed;
    delete newformdata.jobChange;
    delete newformdata.jobChangeDuration;
    delete newformdata.preferredCompany;
    delete newformdata.preferredLocation;
    delete newformdata.prevCompanies;
    delete newformdata.takeTraining;

    delete newformdata.years;
    delete newformdata.months;
    delete newformdata.resume;

    return newformdata;
  }

  // Getting Exp based on years and months
  getExperienceMonthsWithInputs(lintYears, lintMonths): number {
    // We are parsing the input values to Int as they might be string values from calling environment
    lintYears = parseInt(lintYears);
    lintMonths = parseInt(lintMonths);

    if (MyAppHttpService.isValidInput(lintYears)) {
      if (lintYears == -1) {
        lintYears = 0;
      }
    } else {
      lintYears = 0;
    }
    if (MyAppHttpService.isValidInput(lintMonths)) {
      if (lintMonths == -1) {
        lintMonths = 0;
      }
    } else {
      lintMonths = 0;
    }
    return (lintYears * 12) + lintMonths;
  };

  ScheduleInterview(){
    this.router.navigate([MyAppHttpService.PathInformation.INTERVIEWS.PATH]);
  }

}
