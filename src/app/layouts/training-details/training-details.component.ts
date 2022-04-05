import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginComponent } from 'src/app/shared/components/pages/user-login/user-login.component';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { environment } from 'src/environments/environment';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';
import { AlertCompComponent } from '../alert-comp/alert-comp.component';
import { TrainingShareComponent } from '../trainings/training-share/training-share.component';

declare var Razorpay: any;

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingDetailsComponent implements OnInit {
  trainingId;
  userType;
  selectedTrainingInfo = {
    mentorInfo: null, courseInfo: null, trainingInfo: null, status: false, topicDetails: [],
    technologies: [], trainingAttachments: [], courseName: '', totalPrice: 0, registeredUsers: [],
    memberDiscount: 0, isRegistered: false
  };
  disableCourses;
  TrainingStatusCodes: any;
  selectedPrice;
  selectedTab;
  checkafterlogin: boolean;
  globaluserdata: any;
  BackListCall: boolean;
  trainingSuccess: boolean;
  dataforshowing: any;
  title: any = '';
  description: string = 'Enjoy the power of Peer-to-Peer Learning!';
  isDataLoaded: boolean;
  trainingDet: any;
  loginResponseTrainingData: any;
  detailsFound: boolean;

  constructor(private route: ActivatedRoute, public dataStorage: DataStorageService, private commonService: CommonService,
    private modalService: NgbModal, private cdr: ChangeDetectorRef, private titleService: Title, private meta: Meta) {
    const params = this.route.snapshot.params;
    console.log('Params: ', params);
    if ('training_id' in params) {
      this.trainingId = params.training_id;
      // this.userType = params.user_type;
    }
    this.TrainingStatusCodes = MyAppHttpService.TRAINING_STATUS_CODES;
    console.log('training status codes', this.TrainingStatusCodes);
   }

  ngOnInit(): void {
    console.log('Global User data: ', this.dataStorage.globalLoggedInUserData);
    this.globaluserdata = this.dataStorage.globalLoggedInUserData;

    if(!!this.globaluserdata) {
      this.userType = this.dataStorage.globalLoggedInUserData.userType == 2 ? 'INT' : 'JS';
      this.selectedTab = this.userType,
      console.log('userdata', this.globaluserdata, this.userType, this.selectedTab);
    }
    console.log('userdata', this.globaluserdata, this.userType, this.selectedTab);

    // this.selectedTrainingInfo.courseInfo.courseName = '';
    
    this.meta.addTag({ name: 'og:title', property: 'og:title', content: this.title + ' - ' + this.description });
    // this.meta.addTag({ name: 'og:description', property: 'og:description', content: this.description });
    
    this.meta.addTag({ name: 'twitter:title', property: 'twitter:title', content: this.title + ' - ' + this.description });
    this.meta.addTag({ name: 'twitter:description', property: 'twitter:description', content: this.description });

    this.onTrainingClick(this.trainingId);
  }

  onTrainingClick(trainingId) {
    let userIdforsending: any;
    var globaluserdata = this.dataStorage.globalLoggedInUserData;
    console.log('Data after click', globaluserdata);
    if (globaluserdata.userId == 0) {
      userIdforsending = null;
    } else {
      userIdforsending = this.dataStorage.globalLoggedInUserData.userId;
    }
    
    this.selectedTrainingInfo.trainingInfo = {};//training;
    //this.TrainingStatus = training.status;
    this.getSelectedTrainingInfo(trainingId, userIdforsending);
    this.getSelectedMentorInfo(trainingId);
    this.getTopicDetails(trainingId);
    if (this.userType == 'INT') {
      this.getRegisteredUsers(trainingId);
    }

    // setTimeout(() => {
    //   this.tabSet.select("tFirst");  
    // }, 200);
  }

  getSelectedTrainingInfo(trainingId, userId) {
    console.log('userId', userId);
    let requestobj: any = {
      "courseId": trainingId,
      "interviewId": null,
      "userId": userId
    }

    this.GettingTrainingData(requestobj, false);
   
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

  getTopicDetails(trainingId) {
    let requestObj = {
      courseId: trainingId
    }
    this.commonService.getTrainingTopicsByMentorId(requestObj).subscribe(response => {
      if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        // this.selectedTrainingInfo = response;
        // this.selectedTrainingInfo.courseName = response.courseName;
        // this.selectedTrainingInfo.technologies = response.technologies;
        // this.selectedTrainingInfo.topicDetails = response.topicsList;
        // this.selectedTrainingInfo.topicDetails.map(x => { x.selected = true; x.isRegistered = true; });
        //this.allTopicsCheck = true;
        // debugger;
        this.selectedTrainingInfo.trainingInfo = response;
        this.selectedTrainingInfo.trainingAttachments = response.attachments;
        
        console.log('Selected training details: ', this.selectedTrainingInfo);
      }
    });
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

  GettingTrainingData(requestobj, logdata) {
    this.disableCourses = false;
    this.commonService.getTrainingInfoByTrainingId(requestobj).subscribe(success => {
      console.log('selected training Info', success);
      //this.areCoursesLoaded = true;

      if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.detailsFound = true;
        this.isDataLoaded = true;
        this.selectedTrainingInfo.courseInfo = success;
        if(this.selectedTrainingInfo.courseInfo.topicList.length != 0){
          for(let i=0; i<this.selectedTrainingInfo.courseInfo.topicList.length; i++){
            this.selectedTrainingInfo.courseInfo.topicList[i].ShowDesc = false;
          }
        }

        this.selectedTrainingInfo.status = success.status;
        // if (logdata == true) {
        //   this.checkafterlogin = true;
        // }
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

       // this.trainingdetailsenable = true;
       console.log('Latest selected training details: ', this.selectedTrainingInfo);
       this.title = 'Learn ' + this.selectedTrainingInfo.courseInfo.courseName + ' directly from Rock Certified Mentor';
       // this.description = 'Get the power of Peer to Peer learning'; // this.selectedTrainingInfo.trainingInfo.courseDescription;

       this.titleService.setTitle(this.title + ' - ' + this.description);
        // this.meta.addTag({ name: 'og:title', property: 'og:title', content: this.title });
        // this.meta.addTag({ name: 'og:description', property: 'og:description', content: this.description });
        
        // this.meta.addTag({ name: 'twitter:title', property: 'twitter:title', content: this.title });
        // this.meta.addTag({ name: 'twitter:description', property: 'twitter:description', content: this.description });
       this.updateChromeTitle();
       this.cdr.detectChanges();
      }
      else {
        this.selectedTrainingInfo.courseInfo = null;
        this.detailsFound = false;
        this.isDataLoaded = true;
      }
    }, error => {

    });

    
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
    if(!!trainingDetails && trainingDetails.topicList.length != 0) {
      for (let j = 0; j < trainingDetails.topicList.length; j++) {
        totalprice = totalprice + parseInt(trainingDetails.topicList[j].price);
      }
      return totalprice;
    }
   
  }

  getTotalHours(trainingDetails) {
    let totalhours = 0;
    if(!!trainingDetails && trainingDetails.topicList.length != 0) {
      for (let j = 0; j < trainingDetails.topicList.length; j++) {
        totalhours = totalhours + parseInt(trainingDetails.topicList[j].duration);
      }
      return totalhours;
    }
    else {
      return 'NA'
    }
  }

  formatPrice(price) {
    return price ? price.toLocaleString('en-IN') : 0;
  }

  registerApp(trainingDetails) {
    console.log('Training details', trainingDetails);

    if (this.selectedTrainingInfo.topicDetails.filter(x => x.isTopicRegistered).length == 0) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Select topics to continue');
      return false;
    }
    //this.modalService.open(UserRegistrationComponent);
    if (this.dataStorage.globalIsLoggedInUser) {
      this.getTrainingAmount(trainingDetails);
    }
    else {
      var modalRefLogin = this.modalService.open(UserLoginComponent, this.dataStorage.globalNgbModalOptions);
      modalRefLogin.componentInstance.data = { operation: true, trainingData: { courseId: trainingDetails.trainingInfo.courseId, topicIds: this.selectedTrainingInfo.topicDetails.filter(x => x.isTopicRegistered == true).map(x => x.topicId) } };
      console.log('data sending', modalRefLogin.componentInstance.data);
      modalRefLogin.result.then((e) => {
        if(!!e && Object.keys(e.returnObj).length != 0){
          this.BackListCall = true;
          this.loginResponseTrainingData = e.returnObj.response.trainingData;
          console.log('data returned back into code', e, trainingDetails, trainingDetails.mentorId, this.dataStorage.globalLoggedInUserData);
          let UserData: any = this.dataStorage.globalLoggedInUserData;
          this.userType = this.dataStorage.globalLoggedInUserData.userType;
          let topicIds = this.loginResponseTrainingData.topicIds;
        trainingDetails.courseInfo.topicList.map(x => x.isTopicRegistered = false);
        console.log('Topics ids from login and training details: ', topicIds, trainingDetails.courseInfo);
        for(let i=0; i< topicIds.length; i++) {
          // trainingDetails.courseInfo.topicList.forEach(element => {
            trainingDetails.courseInfo.topicList.map(element => {
            if(element.topicId == topicIds[i]) {
              element.isTopicRegistered = true;
            }
            // else {
            //   element.isTopicRegistered = false;
            // }
          });
        }
          
          console.log('training details: ', trainingDetails);
          if (trainingDetails.trainingInfo.mentorId != UserData.userId) {
            if (e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.USER_NOT_EXISTS) {
              // if (e.returnObj.response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
              // if (this.dataStorage.globalLoggedInUserData.userType != MyAppHttpService.Roles.JOB_SEEKER) {
              //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training',
              //     'Hi Interviewer, currently registration is restricted because of your role. Please reach out for admin@rockinterview.in for any questions');
              //   return false;
              // }
              this.checkafterlogin = true;
                // this.globaluserdata = UserData;
                console.log('training details: ', trainingDetails);
                this.trainingDet = trainingDetails;
                this.CheckingAfterLogin(true);
                // setTimeout(() => {
                this.AfterData(trainingDetails);

              console.log('data for payment', e);
              // this.payment(e.returnObj.response.requestData.trainingOperation, trainingDetails);
              
              // this.getTrainingAmount(trainingDetails);

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
              //     { courseId: trainingDetails.trainingInfo.courseId, topicIds: trainingDetails.courseInfo.filter(x => x.isRegistered == true).map(x => x.topicId) }
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
                this.checkafterlogin = true;
                // this.globaluserdata = UserData;
                console.log('training details: ', trainingDetails);
                this.trainingDet = trainingDetails;
                this.CheckingAfterLogin(true);
                // setTimeout(() => {
                this.AfterData(trainingDetails);
              }
              else if (e.returnObj.response.operationStatusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
                console.log('training details: ', trainingDetails);
                this.trainingDet = trainingDetails;
                this.CheckingAfterLogin(true);
                // setTimeout(() => {
                this.AfterData(trainingDetails);
                this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Training already registered');
                console.log('firing here for changing status');
                trainingDetails.isRegistered = true;
              }
            }
          } else {
            this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'You cannot Register to your own trainings');
            this.selectedTab = 'INT';
          }
        }
      });
    }
  }

  CheckingAfterLogin(value) {
    let trainingInfo: any = this.selectedTrainingInfo.trainingInfo;
    let trainingId = trainingInfo.courseId;
    console.log('userId dv', trainingInfo, trainingId, this.globaluserdata.userId);
    let globaluserdata: any = this.dataStorage.globalLoggedInUserData;
    this.selectedTab = globaluserdata.userType == 2 ? 'INT' : 'JS';
    this.userType = this.selectedTab;
    let requestobj: any = {
      "courseId": trainingId,
      "interviewId": null,
      "userId": globaluserdata.userId
    }
    this.cdr.detectChanges();
    console.log('Request data in checking after login: ', requestobj);
    this.GettingTrainingData(requestobj, true);
    if (this.userType == 'INT') {
      this.getRegisteredUsers(trainingId);
    }
  }

  AfterData(trainingDetails) {
    console.log('Training details in after data: ', trainingDetails, this.trainingDet, this.loginResponseTrainingData);

    setTimeout(() => {
      if (this.checkafterlogin == true) {
        console.log('Training details inside: ', trainingDetails, this.trainingDet, this.loginResponseTrainingData);
        
        let topicIds = this.loginResponseTrainingData.topicIds;
        trainingDetails.courseInfo.topicList.map(x => x.isTopicRegistered = false);
        console.log('Topics ids from login and training details: ', topicIds, trainingDetails.courseInfo);
        for(let i=0; i< topicIds.length; i++) {
          // trainingDetails.courseInfo.topicList.forEach(element => {
            trainingDetails.courseInfo.topicList.map(element => {
            if(element.topicId == topicIds[i]) {
              element.isTopicRegistered = true;
            }
            // else {
            //   element.isTopicRegistered = false;
            // }
          });
        }

        if (this.selectedTrainingInfo.courseInfo.status == 'Suggested') {
          
          if(this.userType == 'INT') {
            if(this.selectedTrainingInfo.courseInfo.mentorId != this.dataStorage.globalLoggedInUserData.userId) {
              this.getTrainingAmount(trainingDetails);
            }
          }
          else {
            this.getTrainingAmount(trainingDetails);
          }
          // if(!this.selectedTrainingInfo.courseInfo.isAssignedByAdmin || (this.selectedTrainingInfo.courseInfo.mentorId != this.dataStorage.globalLoggedInUserData.userId)) {
          //   this.getTrainingAmount(trainingDetails);
          // }
          
          this.checkafterlogin = false;
        } else {
          this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Register Training', 'Training already registered');
        }
      } else {
        this.AfterData(trainingDetails);
      }
    }, 1000);
  }

  getTrainingAmount(trainingDetails) {
    
    var requestObj = {
      courseId: trainingDetails.trainingInfo.courseId,
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
      courseId: trainingDetails.trainingInfo.courseId,
      userId: this.dataStorage.globalLoggedInUserData.userId,
      interviewId: null,
      topics: this.selectedTrainingInfo.topicDetails,
      paymentId: paymentId,
      status: 'Registered',
      courseAmount: Math.round(response.courseAmount - (response.courseAmount * response.discount / 100)),
      discount: response.discount ? response.discount : null
    }
    console.log('Register request data: ', requestObj);
    this.commonService.registerTraining(requestObj).subscribe(response => {
      console.log('Response of register training');
      if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Register Training', 'Training registered successfully');
        this.trainingSuccess = true;
        setTimeout(() => {
          this.trainingSuccess = false;
          this.cdr.detectChanges();
        }, 3000);
        trainingDetails.isRegistered = true;
        trainingDetails.status = 'Registered';
        this.selectedTrainingInfo.courseInfo.status = 'Registered'
        this.selectedTrainingInfo.topicDetails.forEach(element => {
          if (element.isRegistered == true) {
            element.isTopicRegistered = true;
          }
        });

        // this.ChangeStatusInList();

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
    throw new Error('Method not implemented.');
  }

  // ChangeStatusInList() {
  //   // trainingId
  //   let selectedTraining: any = this.selectedTrainingInfo.trainingInfo;
  //   for (let i = 0; i < this.trainingsList.length; i++) {
  //     if (this.trainingsList[i].trainingId == selectedTraining.trainingId) {
  //       this.trainingsList[i].status = 'Registered';
  //     }
  //   }
  // }

  updateChromeTitle() {
    // this.title = (this.dataforshowing.company ? this.dataforshowing.company.toUpperCase() : 'Rock Interview') + ' is hiring ' + this.dataforshowing.jobTitle + ' - Apply Now!'
    this.title = 'Learn ' + this.selectedTrainingInfo.courseInfo.courseName + ' directly from Rock Certified Mentor';
    this.titleService.setTitle(this.title + ' - ' + this.description);
    // this.meta.updateTag({ name: 'og:title', property: 'og:title', content: 'We are hiring ' + this.dataforshowing.jobTitle + ' at ' + this.dataforshowing.company + ' - Apply Now! #Job' });
    this.meta.updateTag({ name: 'og:title', property: 'og:title', content: this.title + ' - ' + this.description});
    // this.meta.updateTag({ name: 'og:description', property: 'og:description', content: this.description });
    
    this.meta.updateTag({ name: 'twitter:title', property: 'twitter:title', content: this.title + ' - ' + this.description });
    this.meta.updateTag({ name: 'twitter:description', property: 'twitter:description', content: this.description });
    // this.meta.updateTag({ name: 'og:image', property: 'og:title',content: 'https://lh3.googleusercontent.com/-qm9T2ztCy7E/X-_38YTD_eI/AAAAAAAAFsw/ECcwA3j398gxB_NzULzXeiLEzWN5u7xtACK8BGAsYHg/s0/2021-01-01.png' });
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
            // this.EditCourse(training);
          }
        });
      }
      else {
        let requestData = {
          courseId: training.courseId
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
                  courseId: training.courseId,
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
            // this.EditCourse(training);
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
              courseId: training.courseId
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

  // EditCourse(training) {
  //   console.log('Training data for edit', training);
  //   this.dataStorage.EditTraining = true;
  //   // this.dataStorage.TrainingDataForEdit = training;
  //   this.router.navigate([MyAppHttpService.PathInformation.EDIT_TRAINING.PATH], {
  //     queryParams: {
  //       'trainingId': training.trainingId
  //     }
  //   });
  // }

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


}
