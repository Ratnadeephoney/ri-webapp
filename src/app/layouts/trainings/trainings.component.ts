import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../shared/service/common.service';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';
import { DownloadAppComponent } from '../../shared/components/pages/download-app/download-app.component';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationComponent } from '../../shared/components/pages/user-registration/user-registration.component';

import { Location } from '@angular/common';
import { UserLoginComponent } from '../../shared/components/pages/user-login/user-login.component';
import { environment } from '../../../environments/environment';
import { response } from 'express';
import { AlertCompComponent } from '../alert-comp/alert-comp.component';
import { TrainingShareComponent } from './training-share/training-share.component';
import { ClipboardService } from 'ngx-clipboard';

declare var Razorpay: any;




@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingsComponent implements OnInit {

  searchForm: FormGroup;
  hoursarray = ['false'];
  // seeLessHideHour = false;
  // seeLessHidePrice = false;
  trainingsList = [];
  selectedTrainingInfo = {
    mentorInfo: null, courseInfo: null, trainingInfo: {}, status: false, topicDetails: [],
    technologies: [], trainingAttachments: [], courseName: '', totalPrice: 0, registeredUsers: [],
    memberDiscount: 0, isRegistered: false, showMore: true
  };
  perPageItems = [5, 10, 15, 20, 25];
  selectedPage = this.perPageItems[1];
  paginationProps = { itemsPerPage: this.perPageItems[1], currentPage: 1, totalItems: 200 };
  @ViewChild('tabSet') tabSet: NgbTabset;
  selectedTrainingType = 'ALL';
  trainingSuccess = false;
  disableCourses;
  selectedFilter;
  TrainingDataAfterClick: any = {};
  TrainingStatus: any = 'Suggested';
  selectedPrice;
  allTopicsCheck: boolean;
  trainingFilters = { ALL: 'ALL', MY_TRAININGS: 'OWN' };

  trainingdetails: boolean = false;

  trainingdetailsenable: boolean = false;

  checkafterlogin: boolean = false;

  UserType: any = 'JS';

  BackListCall: any = false;

  skillslist: any = [
    "Core Java",
    "Selenium",
    "Angular",
    "Ionic",
    "Oracle",
    "MySql",
    "Advanced Java"
  ]

  selectedTab;
  roles = MyAppHttpService.Roles;

  JSFilters = [{ id: 'ALL', value: 'All' }, { id: 'FOR_YOU', value: 'Suggested for you' },
  { id: 'REG', value: 'Registered' }, { id: 'COMPLETED', value: 'Completed' }];
  IntFilters = [{ id: 'ALL', value: 'All' }, { id: 'CREATED', value: 'Created' },
  { id: 'ASSIGNED', value: 'Assigned' }, { id: 'COMPLETED', value: 'Completed' }];

  globaluserdata: any;

  TrainingStatusCodes: any;

  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _clipboardService: ClipboardService) {
    this.TrainingDataAfterClick.attachments = null;
    this.TrainingDataAfterClick.videos = null;
    this.globaluserdata = this.dataStorage.globalLoggedInUserData;
    console.log('userdata', this.globaluserdata);
    this.TrainingStatusCodes = MyAppHttpService.TRAINING_STATUS_CODES;
    console.log('training status codes', this.TrainingStatusCodes);
    this.dataStorage.FromMentor = false;
    this.dataStorage.loggedInFromMenu.subscribe(value => {
      console.log('Fired after log in jobs', value);
      if (value == true) {
        if (this.dataStorage.globalLoggedInUserData.userType == MyAppHttpService.Roles.INTERVIEWER.roleId) {
          this.selectedTab = MyAppHttpService.Roles.INTERVIEWER.roleName;
        }
        else {
          this.selectedTab = MyAppHttpService.Roles.JOB_SEEKER.roleName
        }
        this.getAllTrainings(0);
      }
    })
  }

  Tab1Selected() {
    this.selectedFilter = this.trainingFilters.ALL;
    this.selectedTrainingType = 'ALL';
    this.selectedTab = this.roles.INTERVIEWER.roleName;
    this.getAllTrainings(0);
  }

  Tab2Selected() {
    this.selectedFilter = this.trainingFilters.ALL;
    this.selectedTrainingType = 'ALL';
    this.selectedTab = this.roles.JOB_SEEKER.roleName;
    this.getAllTrainings(0);
  }

  ngOnInit() {

    for (let inc = 0; inc <= 20; inc++) {
      this.hoursarray.push('false')
    }

    if (!this.selectedTab) {
      if (this.dataStorage.globalLoggedInUserData.userType == MyAppHttpService.Roles.INTERVIEWER.roleId) {
        this.selectedTab = MyAppHttpService.Roles.INTERVIEWER.roleName;
      }
      else {
        this.selectedTab = MyAppHttpService.Roles.JOB_SEEKER.roleName
      }
    }
    console.log('title', this.route.snapshot.data['title']);
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
    this.searchForm = new FormBuilder().group({
      'skills': [""],
      'locations': [""]
    });




    // this.dataStorage.sub_GlobalSkills.subscribe(()=>{
    //   this.route.queryParams.subscribe(params => {
    //     if(params.skills){
    //       this.dataStorage.globalSelectedSKillsList = params.skills.split(',');
    //       //this.dataStorage.globalSelectedSKillsList  =this.dataStorage.globalSkillsList.filter(x=> params.skills.split(',').indexOf(x.skillId.toString()) > -1)
    //       this.onLoad();
    //     }

    //   });
    // });
    //this.onLoad();
    this.route.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.skills) {
        if (this.dataStorage.globalSkillsList == null) {
          this.commonService.getAllSkills().subscribe(success => {
            console.log('skills list', success);
            this.dataStorage.globalSkillsList = success.listOfTechnologies;
            // this.dataStorage.globalSelectedSKillsList = params.skills.split(',').map(Number);
            this.dataStorage.globalSelectedSKillsList = this.GettingSkillIdsUsingNames(params.skills.split(','));
          })
        } else {
          this.dataStorage.globalSelectedSKillsList = this.GettingSkillIdsUsingNames(params.skills.split(','));
        }
        //this.dataStorage.globalSelectedSKillsList  =this.dataStorage.globalSkillsList.filter(x=> params.skills.split(',').indexOf(x.skillId.toString()) > -1)

      }
      setTimeout(() => {
        this.onLoad();
      }, 500);
      // this.onLoad();
    });
  }

  onLoad() {
    this.searchForm.controls['skills'].setValue(this.dataStorage.globalSelectedSKillsList);
    console.log('Skills value: ', this.searchForm.controls.skills.value);
    this.searchForm.controls['locations'].setValue(this.dataStorage.globalSelectedLocationsList);
    this.getAllTrainings(0);

    this.searchForm.controls['skills'].valueChanges.subscribe((value) => {
      this.dataStorage.globalSelectedSKillsList = value;
    });
    this.searchForm.controls['locations'].valueChanges.subscribe((value) => {
      this.dataStorage.globalSelectedLocationsList = value;
    });
  }

  EditCourse(training) {
    console.log('Training data for edit', training);
    this.dataStorage.EditTraining = true;
    // this.dataStorage.TrainingDataForEdit = training;
    this.router.navigate([MyAppHttpService.PathInformation.EDIT_TRAINING.PATH], {
      queryParams: {
        'trainingId': training.trainingId
      }
    });
  }

  DeleteCourse(training) {
    console.log('Training data for delete', training);
  }


  isDataLoaded = false;
  getAllTrainings(offset) {
    var requestObj = {
      "skills": this.dataStorage.globalSelectedSKillsList ? this.dataStorage.globalSelectedSKillsList : [],
      "locationIds": this.dataStorage.globalSelectedLocationsList ? this.dataStorage.globalSelectedLocationsList : [],
      "limit": this.paginationProps.itemsPerPage,
      "offset": offset,
      // "filter": this.selectedFilter == 2 ? 'FOR_YOU' : null,
      "filter": this.selectedFilter,
      "source": "WEB",
      "type": this.selectedTab
    };
    this.isDataLoaded = false;



    console.log('request data for getting trainings', requestObj);
    this.commonService.getAllTrainings(requestObj, this.selectedTrainingType).subscribe(success => {
      console.log('response after getting trainings', success);
      this.isDataLoaded = true;
      if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        if (this.selectedTab == 'JS') {
          if (!!success.trainingList) {
            success.trainingList.forEach(element => {
              element.randomNumber = Math.floor(Math.random() * 5) + 1;
            });
          }
          this.trainingsList = success.trainingList;
        } else if (this.selectedTab == 'INT') {
          if (!!success.mentorTrainings) {
            success.mentorTrainings.forEach(element => {
              element.randomNumber = Math.floor(Math.random() * 5) + 1;
            });
          }
          this.trainingsList = success.mentorTrainings;
        }
        this.areCoursesLoaded = false;
        this.paginationProps.totalItems = success.totalResults > 200 ? 200 : success.totalResults;

        this.updatingTrainingsList(this.trainingsList);
        // this.onTrainingClick(this.trainingsList[0]);


        // if (this.dataStorage.globalSelectedSKillsList && this.dataStorage.globalSelectedSKillsList.length != 0 && this.dataStorage.globalSelectedLocationsList && this.dataStorage.globalSelectedLocationsList.length != 0){
        //   this.location.replaceState(`${this.dataStorage.globalPathInformation.TRAININGS.PATH}?skills=${this.dataStorage.globalSelectedSKillsList.join(',')}&locations=${this.dataStorage.globalSelectedLocationsList.join(',')}`);
        if (this.dataStorage.globalSelectedSKillsList && this.dataStorage.globalSelectedSKillsList.length != 0) {
          this.location.replaceState(`${this.dataStorage.globalPathInformation.TRAININGS.PATH}?skills=${this.GettingSkillNamesUsingIds(this.dataStorage.globalSelectedSKillsList).join(',')}`);
        }
        // else if(this.dataStorage.globalSelectedLocationsList && this.dataStorage.globalSelectedLocationsList.length != 0){
        //   this.location.replaceState(`${this.dataStorage.globalPathInformation.TRAININGS.PATH}?locations=${this.dataStorage.globalSelectedLocationsList.join(',')}`);
        // }

        document.getElementById('results') &&
          (document.getElementById('results').scrollTop = 0);
      }
      else {
        this.trainingsList = [];
        if (this.dataStorage.globalSelectedSKillsList && this.dataStorage.globalSelectedSKillsList.length != 0) {
          this.location.replaceState(`${this.dataStorage.globalPathInformation.TRAININGS.PATH}?skills=${this.GettingSkillNamesUsingIds(this.dataStorage.globalSelectedSKillsList).join(',')}`);
        }
      }
    }, error => {

    });
  }

  updatingTrainingsList(trainingsList) {
    for (let i = 0; i < trainingsList.length; i++) {
      trainingsList[i].ShowMore = false;
    }
    this.trainingsList = trainingsList;
  }

  GettingSkillNamesUsingIds(IdsList) {
    let SkillnameList: any = [];
    console.log('Ids List', IdsList);
    if (this.dataStorage.globalSkillsList.length > 0) {
      for (let i = 0; i < IdsList.length; i++) {
        for (let j = 0; j < this.dataStorage.globalSkillsList.length; j++) {
          if (IdsList[i] == this.dataStorage.globalSkillsList[j].technologyId) {
            let skill = JSON.parse(JSON.stringify(this.dataStorage.globalSkillsList[j].technologyDescription));
            skill = skill.split(" ").join("-");
            // console.log('after trim', skill);
            SkillnameList.push(skill);
          }
        }
      }
    }
    console.log('skill names list', SkillnameList);
    return SkillnameList;
  }

  GettingSkillIdsUsingNames(NamesList) {
    console.log('names list', NamesList);
    let SkillIdsList: any = [];
    if (this.dataStorage.globalSkillsList.length > 0) {
      for (let i = 0; i < NamesList.length; i++) {
        for (let j = 0; j < this.dataStorage.globalSkillsList.length; j++) {
          let techdesc = JSON.parse(JSON.stringify(this.dataStorage.globalSkillsList[j].technologyDescription));
          techdesc = techdesc.split(" ").join("-");
          // console.log('after trim 1', techdesc);
          if (NamesList[i] == techdesc) {
            SkillIdsList.push(this.dataStorage.globalSkillsList[j].technologyId);
          }
        }
      }
    }
    console.log('skill Ids list', SkillIdsList);
    return SkillIdsList;
  }

  AddTraining() {
    this.dataStorage.FromMentor = false;
    this.router.navigate([MyAppHttpService.PathInformation.CREATE_TRAINING.PATH]);
  }



  onTrainingClick(training, By) {
    this.UserType = By;
    let userIdforsending: any;
    this.globaluserdata = this.dataStorage.globalLoggedInUserData;
    console.log('Data after click', this.globaluserdata);
    if (this.globaluserdata == null) {
      userIdforsending = null;
    } else {
      userIdforsending = this.globaluserdata.userId;
    }
    this.trainingdetails = true;
    this.selectedTrainingInfo.trainingInfo = training;
    this.TrainingStatus = training.status;
    this.getSelectedTrainingInfo(training.trainingId, userIdforsending);
    this.getSelectedMentorInfo(training.trainingId);
    this.getTopicDetails(training.trainingId);
    if (this.selectedTab == 'INT') {
      this.getRegisteredUsers(training.trainingId);
    }

    // setTimeout(() => {
    //   this.tabSet.select("tFirst");  
    // }, 200);
    document.getElementById('detailsresults') &&
      (document.getElementById('detailsresults').scrollTop = 0);

    console.log('Training details before navigating: ', training, this.UserType, this.selectedTab);
    // this.router.navigate(['/training-details', training.trainingId, this.selectedTab]);
  }

  BackToList() {
    this.trainingdetails = false;
    this.trainingdetailsenable = false;
    if (this.selectedTab == 'JS' && this.dataStorage.globalLoggedInUserData.userType == 2) {
      setTimeout(() => {
        this.tabSet.select("tSecond");
      }, 200);
    }
    if (this.BackListCall == true) {
      this.BackListCall = false;
      this.getAllTrainings(0);
    }
    // this.getAllTrainings(0);
  }

  areCoursesLoaded;
  getSelectedTrainingInfo(trainingId, userId) {
    console.log('userId', userId);
    let requestobj: any = {
      "courseId": trainingId,
      "interviewId": null,
      "userId": userId
    }

    this.GettingTrainingData(requestobj, false);
    // this.disableCourses = false;
    // this.commonService.getTrainingInfoByTrainingId(requestobj).subscribe(success => {
    //   console.log('selected training Info', success);
    //   this.areCoursesLoaded = true;

    //   if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
    //     this.selectedTrainingInfo.courseInfo = success;
    //     this.selectedTrainingInfo.status = success.status;
    //     this.selectedTrainingInfo.isRegistered = (success.status == 'Registered'
    //       || success.status == 'InProgress' || success.status == 'Completed') ? true : false;
    //     this.selectedTrainingInfo.technologies = success.technologies;
    //     this.selectedTrainingInfo.topicDetails = success.topicList;
    //     this.selectedTrainingInfo.memberDiscount = success.memberDiscount ? success.memberDiscount : 0;
    //     let a = this.selectedTrainingInfo.topicDetails.map(x => JSON.parse(x.price));
    //     // let b = a.map(x => JSON.parse(x));
    //     this.selectedTrainingInfo.totalPrice = a.reduce((x, y) => x + y, 0);

    //     this.disableCourses = success.topicList.filter(x => x.isRegistered).length > 0 ? true : false;

    //     if (this.disableCourses) {
    //       this.selectedTrainingInfo.topicDetails.filter(x => x.isRegistered ? x.isTopicRegistered = true : x.isTopicRegistered = false);
    //     }
    //     else {
    //       this.selectedTrainingInfo.topicDetails.filter(x => x.isTopicRegistered = true);
    //     }

    //     this.trainingdetailsenable = true;

    //   }
    //   else {
    //     this.selectedTrainingInfo.courseInfo = null;
    //   }
    // }, error => {

    // });
  }

  async shareToJS(training, event) {
    event.stopPropagation();
    if (!!training) {

      if (training.isAssignedByAdmin) {
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Share Training', "You can't share Admin assigned training");

        return false;
      }

      if (training.totalTopics == 0) {
        let dataforsending: any = {};
        dataforsending.header = 'Confirm';
        dataforsending.message = 'Please Add topics before sharing';
        dataforsending.button1 = 'Cancel';
        dataforsending.button2 = 'Ok';
        let modalRef = this.modalService.open(AlertCompComponent);
        modalRef.componentInstance.data = { AlertData: dataforsending };
        modalRef.result.then((e) => {
          if (e == true) {
            console.log('Fired after ok');
            this.EditCourse(training);
          }
        });
      }
      else {
        let requestData = {
          courseId: training.trainingId
        }
        let jsList = [];
        let selectedJS = [];

        this.commonService.getInterviewedJobseekers(requestData).subscribe(async response => {
          console.log('Interviewed JS: ', response);
          if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
            jsList = response.jsDetails;
            let modalRef = this.modalService.open(TrainingShareComponent);
            modalRef.componentInstance.data = { jobseekersList: jsList };
            modalRef.result.then((modalData) => {
              // if (e == true) {
              //   console.log('Fired after ok');

              // }
              selectedJS = !!modalData ? modalData : [];
              console.log('selected js data: ', selectedJS, modalData);
              if (selectedJS.length != 0) {


                // console.log('Confirm Okay');
                let requestObj = {
                  courseId: training.trainingId,
                  shareToJsReq: selectedJS
                }
                this.commonService.shareTrainingToJS(requestObj).subscribe(response => {
                  console.log('Response: ', response);
                  if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Share Training', 'Training shared successfully');
                    training.status = 'Suggested';
                  }
                });
              }
            });
          } else if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.NOT_FOUND) {
            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Share Training', 'You should complete Interviews to get Jobseekers');
          }
        })

      }
    }
    event.stopPropagation();
  }
  async shareToAll(training, event) {
    event.stopPropagation();
    if (!!training) {
      if (training.isAssignedByAdmin) {
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Share Training', "You can't share Admin assigned training");

        return false;
      }

      if (training.totalTopics == 0) {
        let dataforsending: any = {};
        dataforsending.header = 'Confirm';
        dataforsending.message = 'Please Add topics before sharing';
        dataforsending.button1 = 'Cancel';
        dataforsending.button2 = 'Ok';
        let modalRef = this.modalService.open(AlertCompComponent);
        modalRef.componentInstance.data = { AlertData: dataforsending };
        modalRef.result.then((e) => {
          if (e == true) {
            console.log('Fired after ok');
            this.EditCourse(training);
          }
        });
      }
      else {
        let dataforsending: any = {};
        dataforsending.header = 'Confirm';
        dataforsending.message = 'Are you sure you want to share this training?';
        dataforsending.button1 = 'Cancel';
        dataforsending.button2 = 'Ok';
        let modalRef = this.modalService.open(AlertCompComponent);
        modalRef.componentInstance.data = { AlertData: dataforsending };
        modalRef.result.then((e) => {
          if (e == true) {
            console.log('Fired after ok');
            let requestObj = {
              courseId: training.trainingId
            }
            this.commonService.shareTrainingToAll(requestObj).subscribe(response => {
              console.log('Response: ', response);
              if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Share Training', 'Training shared successfully');
                training.status = 'Suggested';
              }
            })
          }
        });
      }
    }
    event.stopPropagation();
  }

  CheckingAfterLogin(value) {
    let trainingInfo: any = this.selectedTrainingInfo.trainingInfo;
    let trainingId = trainingInfo.trainingId;
    console.log('userId dv', trainingId, this.globaluserdata.userId);
    let globaluserdata: any = this.dataStorage.globalLoggedInUserData;
    let requestobj: any = {
      "courseId": trainingId,
      "interviewId": null,
      "userId": globaluserdata.userId
    }
    this.GettingTrainingData(requestobj, true);
  }

  GettingTrainingData(requestobj, logdata) {
    this.disableCourses = false;
    this.commonService.getTrainingInfoByTrainingId(requestobj).subscribe(success => {
      console.log('selected training Info', success);
      this.areCoursesLoaded = true;

      if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.selectedTrainingInfo.courseInfo = success;
        if (this.selectedTrainingInfo.courseInfo.topicList.length != 0) {
          for (let i = 0; i < this.selectedTrainingInfo.courseInfo.topicList.length; i++) {
            this.selectedTrainingInfo.courseInfo.topicList[i].ShowDesc = false;
          }
        }

        this.selectedTrainingInfo.status = success.status;
        if (logdata == true) {
          this.checkafterlogin = true;
        }
        this.selectedTrainingInfo.isRegistered = (success.status == 'Registered'
          || success.status == 'InProgress' || success.status == 'Completed') ? true : false;
        this.selectedTrainingInfo.technologies = success.technologies;
        this.selectedTrainingInfo.topicDetails = success.topicList;
        this.selectedTrainingInfo.memberDiscount = success.memberDiscount ? success.memberDiscount : 0;
        let a = this.selectedTrainingInfo.topicDetails.map(x => JSON.parse(x.price));
        // let b = a.map(x => JSON.parse(x));
        this.selectedTrainingInfo.totalPrice = a.reduce((x, y) => x + y, 0);

        this.disableCourses = success.topicList.filter(x => x.isRegistered).length > 0 ? true : false;

        if (this.disableCourses) {
          this.selectedTrainingInfo.topicDetails.filter(x => x.isRegistered ? x.isTopicRegistered = true : x.isTopicRegistered = false);
        }
        else {
          this.selectedTrainingInfo.topicDetails.filter(x => x.isTopicRegistered = true);
        }

        this.trainingdetailsenable = true;

      }
      else {
        this.selectedTrainingInfo.courseInfo = null;
      }
    }, error => {

    });
  }

  getSelectedMentorInfo(trainingId) {
    let requestobj: any = {
      courseId: trainingId
    }
    this.commonService.getMentorInfoByMentorId(requestobj).subscribe(response => {
      if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        if (response.experience != null && response.experience != undefined && response.experience > 0) {
          response.experience = this.convertExpToYearsAndMonths(response.experience);
        }
        let a = /,/gi;
        response.technologies = response.technologies.replace(a, ', ');
        console.log('response of mentor', response);
        this.selectedTrainingInfo.mentorInfo = response;
      }
      else {
        this.selectedTrainingInfo.mentorInfo = {};
      }
    }, error => {

    });
  }

  OpenAttachment(data) {
    if (data.multimediaPath != null) {
      this.downloadFile(data.multimediaPath, data.multimediaPath.substr(data.multimediaPath.lastIndexOf('/') + 1))
    }
  }

  downloadFile(url, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '' + url + '', true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      //var urlCreator = window.URL || window.webkitURL;
      var urlCreator = window.URL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
    xhr.send();
  }

  getTopicDetails(trainingId) {
    let requestObj = {
      courseId: trainingId
    }
    this.commonService.getTrainingTopicsByMentorId(requestObj).subscribe(response => {
      if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        // this.selectedTrainingInfo = response;
        this.selectedTrainingInfo.courseName = response.courseName;
        // this.selectedTrainingInfo.technologies = response.technologies;
        // this.selectedTrainingInfo.topicDetails = response.topicsList;
        // this.selectedTrainingInfo.topicDetails.map(x => { x.selected = true; x.isRegistered = true; });
        this.allTopicsCheck = true;
        this.selectedTrainingInfo.trainingAttachments = response.attachments;
        console.log('Selected training details: ', this.selectedTrainingInfo);
      }
    });
  }

  convertExpToYearsAndMonths(exp) {
    let yearsText = '';
    if (!!exp) {
      if (!(exp / 12 == 0)) {
        yearsText = yearsText + `${Math.floor(exp / 12)} ` + `${Math.floor(exp / 12) == 1 ? 'Year' : 'Years '}`;
      }
      if (!(exp % 12 == 0)) {
        yearsText = yearsText + `${Math.floor(exp % 12)} ` + `${Math.floor(exp % 12) == 1 ? 'Month' : 'Months'}`;
      }
    }
    return yearsText;
  }

  onPageChanges(event) {
    this.paginationProps.currentPage = event;
    this.getAllTrainings(this.paginationProps.itemsPerPage * (event - 1));
  }

  onTrainingTypeChange(event) {
    console.log('selected training type', this.selectedTrainingType);
    this.selectedFilter = event.target.value;

    this.paginationProps.currentPage = 0;
    this.getAllTrainings(0);
  }

  onPerPageChange(event) {
    this.paginationProps.itemsPerPage = event.currentTarget.value;
    this.paginationProps.currentPage = 1;
    this.getAllTrainings(0);
  }

  onSearchClick() {
    this.paginationProps.currentPage = 1;
    // this.selectedPage = this.perPageItems[0];
    // this.paginationProps.itemsPerPage = this.perPageItems[0];
    this.getAllTrainings(0);

  }

  downloadApp() {
    this.modalService.open(DownloadAppComponent);
  }

  registerApp(trainingDetails) {
    console.log('Training details', trainingDetails);

    if (this.selectedTrainingInfo.topicDetails.filter(x => x.isTopicRegistered).length == 0) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Select courses to continue');
      return false;
    }
    //this.modalService.open(UserRegistrationComponent);
    if (this.dataStorage.globalIsLoggedInUser) {
      this.getTrainingAmount(trainingDetails);
    }
    else {
      var modalRefLogin = this.modalService.open(UserLoginComponent, this.dataStorage.globalNgbModalOptions);
      modalRefLogin.componentInstance.data = { operation: true, trainingData: { courseId: trainingDetails.trainingInfo.trainingId, topicIds: this.selectedTrainingInfo.topicDetails.filter(x => x.isTopicRegistered == true).map(x => x.topicId) } };
      console.log('data sending', modalRefLogin.componentInstance.data);
      modalRefLogin.result.then((e) => {
        this.BackListCall = true;
        console.log('data returned back into code', e, trainingDetails, trainingDetails.mentorId, this.dataStorage.globalLoggedInUserData);
        let UserData: any = this.dataStorage.globalLoggedInUserData;
        if (trainingDetails.trainingInfo.mentorId != UserData.userId) {
          if (e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.USER_NOT_EXISTS) {
            // if (e.returnObj.response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
            // if (this.dataStorage.globalLoggedInUserData.userType != MyAppHttpService.Roles.JOB_SEEKER) {
            //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training',
            //     'Hi Interviewer, currently registration is restricted because of your role. Please reach out for admin@rockinterview.in for any questions');
            //   return false;
            // }
            console.log('data for payment', e);
            // this.payment(e.returnObj.response.requestData.trainingOperation, trainingDetails);
            this.getTrainingAmount(trainingDetails);

            // }, 2000);

            // }
            // else if (e.returnObj.response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
            //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Training already registered');
            //   trainingDetails.isRegistered = true;
            // }
            // var modalRefRegistration = this.modalService.open(UserRegistrationComponent, this.dataStorage.globalNgbModalOptions);
            // modalRefRegistration.componentInstance.data =
            // {
            //   mobileNumber: e.returnObj.mobileNumber, sessionId: e.returnObj.sessionId, operation: true, jobData: null, trainingData:
            //     { courseId: trainingDetails.trainingInfo.trainingId, topicIds: trainingDetails.courseInfo.filter(x => x.isRegistered == true).map(x => x.topicId) }
            // };
            // modalRefRegistration.result.then((e) => {
            //   //trainingDetails.trainingInfo.isRegistered = true;
            //   if (e.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
            //     if (e.operationStatusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
            //       if (this.dataStorage.globalLoggedInUserData.userType != MyAppHttpService.Roles.JOB_SEEKER) {
            //         this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training',
            //           'Hi Interviewer, currently registration is restricted because of your role. Please reach out for admin@rockinterview.in for any questions');
            //         return false;
            //       }
            //       this.payment(e.trainingOperation, trainingDetails);
            //     }
            //     else if (e.operationStatusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
            //       this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Training already registered');
            //       trainingDetails.isRegistered = true;
            //     }
            //   }
            // });
          }
          else if (e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
            if (e.returnObj.response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
              // if (this.dataStorage.globalLoggedInUserData.userType != MyAppHttpService.Roles.JOB_SEEKER) {
              //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training',
              //     'Hi Interviewer, currently registration is restricted because of your role. Please reach out for admin@rockinterview.in for any questions');
              //   return false;
              // }
              // this.payment(e.returnObj.response.requestData.trainingOperation, trainingDetails);
              this.checkafterlogin = false;
              this.CheckingAfterLogin(true);
              // setTimeout(() => {
              this.AfterData(trainingDetails);
            }
            else if (e.returnObj.response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
              this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Training already registered');
              console.log('firing here for changing status');
              trainingDetails.isRegistered = true;
            }
          }
        } else {
          this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'You cannot Register to your own trainings');
          this.selectedTab = 'INT';
        }
      });
    }
  }

  AfterData(trainingDetails) {
    setTimeout(() => {
      if (this.checkafterlogin == true) {
        if (this.selectedTrainingInfo.courseInfo.status == 'Suggested') {
          this.getTrainingAmount(trainingDetails);
          this.checkafterlogin = false;
        } else {
          this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Training already registered');
        }
      } else {
        this.AfterData(trainingDetails);
      }
    }, 2000);
  }

  getTrainingAmount(trainingDetails) {
    var requestObj = {
      courseId: trainingDetails.trainingInfo.trainingId,
      topics: trainingDetails.courseInfo.topicList.filter(x => x.isTopicRegistered == true).map(x => x.topicId)
    };

    this.commonService.getTrainingAmount(requestObj).subscribe(response => {
      if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        // if (this.dataStorage.globalLoggedInUserData.userType != MyAppHttpService.Roles.JOB_SEEKER) {
        //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training',
        //     'Hi Interviewer, currently registration is restricted because of your role. Please reach out for admin@rockinterview.in for any questions');
        //   return false;
        // }
        this.payment(response, trainingDetails);
      }
      else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Training already registered');
        trainingDetails.isRegistered = true;
      }
    }, error => {

    });
  }

  payment(response, trainingDetails) {
    var price = Math.round(response.courseAmount - (response.courseAmount * response.discount / 100));
    var self = this;
    let options = {
      description: 'value',
      image: environment.payment.image,
      currency: 'INR',
      key: environment.payment.key,
      amount: price * 100,
      name: null,
      handler: (success) => {
        console.log("response: " + success);
        self.successCallback(trainingDetails, success.razorpay_payment_id, response);

      },
      prefill: {
        email: null,
        name: null
      },
      theme: {
        color: '#99226e'
      },
      modal: {
        ondismiss: () => {
          self.MethodAfterCancel();
        },
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();

  };

  successCallback(trainingDetails, payment_id, response) {
    this.confirmRegistration(trainingDetails, payment_id, response);
  };

  MethodAfterCancel() {
    console.log("cancelCallback error: ");
  }

  confirmRegistration(trainingDetails, paymentId, response) {

    this.selectedTrainingInfo.topicDetails.map(x => x.isRegistered = x.isTopicRegistered);
    var requestObj = {
      courseId: trainingDetails.trainingInfo.trainingId,
      userId: this.globaluserdata.userId,
      interviewId: null,
      topics: this.selectedTrainingInfo.topicDetails,
      paymentId: paymentId,
      status: 'Registered',
      courseAmount: Math.round(response.courseAmount - (response.courseAmount * response.discount / 100)),
      discount: response.discount ? response.discount : null
    }

    this.commonService.registerTraining(requestObj).subscribe(response => {
      if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Register Training', 'Training registered successfully');
        this.trainingSuccess = true;
        setTimeout(() => {
          this.trainingSuccess = false;
          this.cdr.detectChanges();
        }, 3000);
        trainingDetails.isRegistered = true;
        trainingDetails.status = 'Registered';
        this.selectedTrainingInfo.topicDetails.forEach(element => {
          if (element.isRegistered == true) {
            element.isTopicRegistered = true;
          }
        });

        this.ChangeStatusInList();

        this.disableCourses = this.selectedTrainingInfo.topicDetails.filter(x => x.isTopicRegistered == true).length > 0 ? true : false;

        this.cdr.detectChanges();


      }
      else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
        //this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Training already registered');
        this.trainingSuccess = true;
        setTimeout(() => {
          this.trainingSuccess = false;
          this.cdr.detectChanges();
        }, 3000);
        trainingDetails.isRegistered = true;
        trainingDetails.courseInfo.forEach(element => {
          if (element.isRegistered == true) {
            element.isTopicRegistered = true;
          }
        });
        this.cdr.detectChanges();
      }
    }, error => {

    });
  }

  ChangeStatusInList() {
    // trainingId
    let selectedTraining: any = this.selectedTrainingInfo.trainingInfo;
    for (let i = 0; i < this.trainingsList.length; i++) {
      if (this.trainingsList[i].trainingId == selectedTraining.trainingId) {
        this.trainingsList[i].status = 'Registered';
      }
    }
  }



  formatPrice(price) {
    return price ? price.toLocaleString('en-IN') : 0;
  }

  getSelectedPrice(trainingDetails) {
    // // var priceArr = trainingDetails.topicList.filter(x => x.Register == true).map(x => x.price)
    // // return priceArr.length > 0 ? priceArr.reduce((a, b) => a + b) : 0;
    // let price = 0;
    // for(let j=0;j<trainingDetails.topicList.length; j++){
    //   if(trainingDetails.topicList[j].Register==true){
    //     price = price + parseInt(trainingDetails.topicList[j].price);
    //   }
    // }
    // return price;

    var priceArr = trainingDetails.topicList.filter(x => x.isTopicRegistered == true).map(x => JSON.parse(x.price));
    this.selectedPrice = priceArr.length > 0 ? priceArr.reduce((a, b) => a + b) : 0;
    return this.selectedPrice;
  }

  getTotalPrice(trainingDetails) {
    let totalprice = 0;
    for (let j = 0; j < trainingDetails.topicList.length; j++) {
      totalprice = totalprice + parseInt(trainingDetails.topicList[j].price);
    }
    return totalprice;
  }

  getTotalHours(trainingDetails) {
    let totalhours = 0;
    for (let j = 0; j < trainingDetails.topicList.length; j++) {
      totalhours = totalhours + parseInt(trainingDetails.topicList[j].duration);
    }
    return totalhours;
  }

  getSelectedHours(trainingDetails) {
    // var priceArr = trainingDetails.topicList.filter(x => x.Register == true).map(x => x.price)
    // return priceArr.length > 0 ? priceArr.reduce((a, b) => a + b) : 0;
    // let hours = 0;
    // for(let j=0;j<trainingDetails.topicList.length; j++){
    //   if(trainingDetails.topicList[j].Register==true){
    //     hours = hours + parseInt(trainingDetails.topicList[j].duration);
    //   }
    // }
    // return hours;
  }

  getRegisteredUsers(trainingId) {
    console.log('Registered', trainingId);
    let requestObj = {
      courseId: trainingId
    }
    this.commonService.getTrainingSession(requestObj).subscribe(response => {
      if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.selectedTrainingInfo.registeredUsers = response.jobSeekeresList;
        console.log('registered users: ', this.selectedTrainingInfo);
      } else {
        this.selectedTrainingInfo.registeredUsers = [];
      }
    });
  }


  convertToYears(months) {
    var yearsText = '';
    if (!!months) {
      //     <span *ngIf="!(int.interviwerExperience/12 == 0)">
      //     {{math.floor(int.interviwerExperience/12)}} Years
      // </span>
      // <span *ngIf="!(int.interviwerExperience%12 == 0)">
      //     {{ int.interviwerExperience%12 | number:'1.0-1' }} Months
      // </span>
      if (!(months / 12 == 0)) {
        yearsText = yearsText + `${Math.floor(months / 12)} ` + `${Math.floor(months / 12) == 1 ? 'Year' : 'Years '}`
      }
      if (!(months % 12 == 0)) {
        yearsText = yearsText + `${Math.floor(months % 12)} ` + `${Math.floor(months % 12) == 1 ? 'Month' : 'Months'}`
      }
    }
    return yearsText;
  }


  scrollToDiv() {
    if (window.outerWidth < 768) {
      const element = document.getElementById('training-details') as HTMLInputElement;
      if (!!element)
        element.scrollIntoView({ behavior: 'smooth', block: "end" });
    }
  }

  onTabChange(event) {
    if (event.nextId == 'tFirst') {
      this.Tab1Selected();
    }
    else {
      this.Tab2Selected();
    }
  }

  MoreOptionsClick(training, event) {
    this.CloseAllMoreOptions(training, true);
    console.log('fired more options');
    training.ShowMore = !training.ShowMore;
    event.stopPropagation();
  }

  CloseAllMoreOptions(training, value) {
    console.log('Training details: ', training);
    if (this.trainingsList.length > 0) {
      for (let i = 0; i < this.trainingsList.length; i++) {
        if (value == true) {
          if (training.trainingId != this.trainingsList[i].trainingId) {
            this.trainingsList[i].ShowMore = false;
          }
        } else {
          this.trainingsList[i].ShowMore = false;
        }
      }
    }
  }

  CopyTraining(training, event, pageType = 'list') {
    console.log('job needs to copy', training, window.location.origin);
    training.ShowMore = false;
    if (pageType == 'list') {
      // if(training.status == 'Suggested') {
      //   let url = window.location.origin + '/training-details/' + training.trainingId;
      //   console.log('Url', url);
      //   this._clipboardService.copy(url);
      //   this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Copy URL', 'Copied to Clipboard');
      // }
      // else {
      //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Copy URL', 'You can share only Approved Training.');
      // }
      // if(training.totalTopics != 0) {
      this.copyTrainingStatus(training);
      // }
      // else {
      //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Copy URL', "Please add topics to share this training.");
      // }

    }
    else if (pageType == 'details') {
      // if(training.topicDetails.length != 0) {
      training.trainingInfo.totalTopics = training.topicDetails.length;
      this.copyTrainingStatus(training.trainingInfo);
      // }
      // else {
      //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Copy URL', "Please add topics to share this training.");
      // }

    }

    // training.ShowMore = false;
    // if (training.isJOD == false) {
    // let url = window.location.origin + '/training-details/' + training.trainingId;
    // console.log('Url', url);
    // this._clipboardService.copy(url);
    // this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Copy URL', 'Copied to Clipboard');
    // } else if (training.isJOD == true) {
    //   this._clipboardService.copy(training.jodUrl);
    //   this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Copy URL', 'Copied to Clipboard');
    // }
    event.stopPropagation();
  }

  copyTrainingStatus(training) {
    console.log('training: ', training, this.selectedTab, training.isApprovedByAdmin, training.isAssignedByAdmin);
    if (this.selectedTab == 'INT' && (!training.isApprovedByAdmin)) { // training.status == 'New' || 
      // this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Copy URL', 'You can share only Approved Training.');
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Copy URL', "This training can't be trained.");
    }
    else if (training.totalTopics == 0) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Copy URL', "Please add topics to share this training.");
    }
    else {
      // if(training.status == 'Suggested' || training.status == 'Registered') {
      let url = window.location.origin + '/training-details/' + training.trainingId;
      console.log('Url', url);
      this._clipboardService.copy(url);
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Copy URL', 'Copied to Clipboard');
    }
    // else if(training.status == 'In Progress' || training.status == 'Completed' ) {
    //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Copy URL', 'You can share only Suggested Trainings.');
    // }
  }



  // 

  // hoursarray = ['false']
  // course.ShowDesc
  counter(i: number) {

    return new Array(i);
  }
  hourgetbackmethod(val1, val2) {
    this.hoursarray[val2] = 'true'
  }

  hourgetfrontmethod(val1, val2) {
    this.hoursarray[val2] = 'false'
  }

}



