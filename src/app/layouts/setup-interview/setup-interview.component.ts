import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/service/common.service';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { interviews } from 'src/app/layouts/'


declare var Razorpay: any;


@Component({
  selector: 'app-setup-interview',
  templateUrl: './setup-interview.component.html',
  styleUrls: ['./setup-interview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetupInterviewComponent implements OnInit {
  header: HttpHeaders;
  // interviewersList = [
  //   {interviewerId: 1, username: 'Venkata Krishna', technologies: 'Amazon cloud, Azure, Manual testing', experience: '2 years',
  //     interviewsTaken: 5, companiesWorked: 'TCS, Infosys', interviewPrice: 299, ratings: 4},
  //   {interviewerId: 2, username: 'Venkata Krishna', technologies: 'Amazon cloud, Azure, Manual testing', experience: '2 years',
  //     interviewsTaken: 5, companiesWorked: 'TCS, Infosys', interviewPrice: 299, ratings: 4},
  //   {interviewerId: 3, username: 'Venkata Krishna', technologies: 'Amazon cloud, Azure, Manual testing', experience: '2 years',
  //     interviewsTaken: 5, companiesWorked: 'TCS, Infosys', interviewPrice: 299, ratings: 4},
  //   {interviewerId: 4, username: 'Venkata Krishna', technologies: 'Amazon cloud, Azure, Manual testing', experience: '2 years',
  //     interviewsTaken: 5, companiesWorked: 'TCS, Infosys', interviewPrice: 299, ratings: 4},
  //   {interviewerId: 5, username: 'Venkata Krishna', technologies: 'Amazon cloud, Azure, Manual testing', experience: '2 years',
  //     interviewsTaken: 5, companiesWorked: 'TCS, Infosys', interviewPrice: 299, ratings: 4},
  //   {interviewerId: 6, username: 'Venkata Krishna', technologies: 'Amazon cloud, Azure, Manual testing', experience: '2 years',
  //     interviewsTaken: 5, companiesWorked: 'TCS, Infosys', interviewPrice: 299, ratings: 4},
  //   {interviewerId: 7, username: 'Venkata Krishna', technologies: 'Amazon cloud, Azure, Manual testing', experience: '2 years',
  //     interviewsTaken: 5, companiesWorked: 'TCS, Infosys', interviewPrice: 299, ratings: 4},
  //   {interviewerId: 8, username: 'Venkata Krishna', technologies: 'Amazon cloud, Azure, Manual testing', experience: '2 years',
  //     interviewsTaken: 5, companiesWorked: '', interviewPrice: 299, ratings: 4},
  // ];

  constructor(
     private _http: HttpClient,
    private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService, private fb: FormBuilder,
    private commonService: CommonService, private cdr: ChangeDetectorRef,
    private router: Router) {
      this.setupInterviewForm = this.fb.group({
        'technologies': ['', Validators.compose([Validators.required])],
        'interviewLevel': ['', Validators.compose([Validators.required])],
        'interviewDate': ['', Validators.compose([Validators.required])]
        
        //'comment': ['', Validators.compose([Validators.maxLength(500)])]
      });

      this.setupInterviewForm.controls['interviewLevel'].valueChanges.subscribe((value)=>{
        
        console.log('value of level', value);
        if(value){
          let value1 = this.StringtoJSON(value);
          if(value1.price != null && value1.price != undefined){
            this.InterviewPrice = value1.price;
            console.log('interviewprice', this.InterviewPrice);
          }
        }
      })
  }
  activeTab = 1;
  minDate;maxDate;
  //selectedDate;
  setupInterviewForm: FormGroup;
  interviewLevels;
  profileTechnologies;
  setupInterviewMetadata;
  interviewersList;
  selectedInterviewInfo = {
    interviewer: {interviewerId: 0, name: '', skills: ''}, 
    slot: {slotTime: '', id: 0}, interviewDate: null, 
    isFreeSelected: false };
  timeSlots = {morningSlots: [], afternoonSlots: [], eveningSlots: []};
  interviewScheduledSuccess;
  InterviewPrice: any = 0;
  newMinDate = {year: 0, month: 0, day: 0};
  newMaxDate = {year: 0, month: 0, day: 0};
  model: any;


  onStepClick(activeTab, flag) {
    if(flag == 0){
      this.activeTab = activeTab;

      if(activeTab == 3){
        this.selectedInterviewInfo.interviewer = {interviewerId: 0, name: '', skills: ''};
      }
    }
    else {
      if(activeTab == 2){
        this.selectedInterviewInfo.isFreeSelected = false;
        if(this.setupInterviewForm.controls['technologies'].valid && this.setupInterviewForm.controls['interviewLevel'].valid){
          this.getSetupInterviewMetadata(activeTab);
        }
        else{
          this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Setup Interview", "Please select atleast one technology to proceed");
        }
      }
      else if(activeTab == 4){
        this.activeTab = activeTab;

        var addDays = 0;
        if((new Date()).getHours() >= 20){
          addDays =1;
        }

        this.getTimeslotInfo();
        this.selectedInterviewInfo.slot = {slotTime: '', id: 0};
      }
    } 
  }


  getTimeslotInfo(){
    var addDays = 0;
    if((new Date()).getHours() >= 20){
      addDays =1;
    }

    var minDate = this.addDays(new Date(), 1 + addDays);
    var maxDate = this.addDays(new Date(), 90 + addDays);
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.maxDate =  new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    this.newMinDate = { year: minDate.getFullYear(), month: minDate.getMonth() + 1, day: minDate.getDate() };
    this.newMaxDate = { year: maxDate.getFullYear(), month: maxDate.getMonth() + 1, day: maxDate.getDate() };
    console.log('Dates: ', minDate, maxDate, this.minDate, this.maxDate, 'New dates: ', this.newMinDate, this.newMaxDate);
    // this.setupInterviewForm.patchValue({interviewDate: this.addDays(new Date(), 1 + addDays)});
    this.setupInterviewForm.patchValue({interviewDate: this.newMinDate});
    this.selectedInterviewInfo.interviewDate = this.addDays(new Date(), 1 + addDays);
    console.log('selected interview date: ', this.selectedInterviewInfo.interviewDate);
    this.getInterviewTimeSlots();
  }


  onDateChange(event){
    // this.selectedInterviewInfo.interviewDate = event.value;
    console.log('selected date from calendar: ', event);
    if(!!event) {
      this.selectedInterviewInfo.interviewDate = new Date(event.year, event.month -1, event.day);
      console.log('selected interview date: ', this.selectedInterviewInfo.interviewDate);
    }
    
    this.getInterviewTimeSlots();
  }
  ngOnInit() {
    // if(localStorage.getItem("successinterviewKey")== "successinterviewschedulesTrue")
    // {
      
    //   setTimeout(() => {
    //     this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, "Setup Interview", "Interview scheduled successfully");
    //     localStorage.setItem("successinterviewKey","successinterviewschedulesFalse")
    //   }, 1000);
    // }
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');

    

    this.getInterviewLevels();
    this.getProfileSkills();
  }

  addDays(date: any, days: number): Date {
    console.log('Date and days: ', date, days);
    if (!days) return date;

    date.setDate(date.getDate() + days);

    return date;
  };

  getInterviewLevels(){
    this.interviewLevels = [];
    this.commonService.getInterviewLevels().subscribe((success)=>{
      if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
        this.interviewLevels = success.interviewLevels;
        this.setupInterviewForm.patchValue({interviewLevel: JSON.stringify(this.interviewLevels[0])});
      }
    }, (error)=>{

    });
  }

  getProfileSkills(){
    this.profileTechnologies  =[];
    this.commonService.getProfileSkills().subscribe((success)=>{
      if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
          this.profileTechnologies = success.technologies;

          this.setupInterviewForm.patchValue({technologies: this.profileTechnologies.map(x=> x.technologyId.toString())});
          //this.setupInterviewForm.controls['technologies'].setValue(this.profileTechnologies.map(x=> parseInt(x.technologyId)));
      }
    }, (error)=>{

    });
  }

  getSetupInterviewMetadata(activeTab){
    this.setupInterviewMetadata = {};
    this.commonService.getSetupInterviewMetadata().subscribe((success)=>{
      if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
          this.setupInterviewMetadata = success.metadata;
          this.selectedInterviewInfo.interviewer = {interviewerId: 0, name: '', skills: ''};

          if(this.setupInterviewMetadata.membershipStatusCode ==  MyAppHttpService.RESPONSE_CODES.SUCCESS 
            && this.setupInterviewMetadata.interviewsRemaining > 0){
              this.activeTab = activeTab + 1;
              this.getInterviewersBySkillIds();
            }
          else if(this.setupInterviewMetadata.isFirstInterview || this.setupInterviewMetadata.isEligibleForOffer){
            this.activeTab = activeTab;
          }
          else {
            this.activeTab = activeTab + 1;
            this.getInterviewersBySkillIds();
          }
          
      }
    }, (error)=>{

    });
  }

  isInterviewerDataLoaded = false;
  getInterviewersBySkillIds(){
    
    this.interviewersList =[];
    this.isInterviewerDataLoaded = false;
    this.commonService.getInterviewersBySkillIds({skillIds: this.setupInterviewForm.value.technologies}).subscribe((success)=>{
      this.isInterviewerDataLoaded = true; 
      if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
          this.interviewersList = success.interviewers; 
         
      }
    }, (error)=>{
      this.isInterviewerDataLoaded = true;
    });
  }


  JSONtoString(value){
    return JSON.stringify(value);
  }

  StringtoJSON(value){
    return  value ? JSON.parse(value) : {};
  }

  isSlotsDataLoaded = false;
  getInterviewTimeSlots(){
    this.timeSlots = {morningSlots: [], afternoonSlots: [], eveningSlots: []};
    var requestObj = {
      "interviewerId": this.selectedInterviewInfo.interviewer ? (this.selectedInterviewInfo.interviewer.interviewerId ? this.selectedInterviewInfo.interviewer.interviewerId: null) : null,
      "scheduleDate": this.formatDate(this.selectedInterviewInfo.interviewDate)
    };

    this.isSlotsDataLoaded = false;
    this.commonService.getInterviewTimeSlots(requestObj).subscribe((success)=>{
      this.isSlotsDataLoaded = true;
      if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
       
        if(this.selectedInterviewInfo.interviewDate.setHours(0,0,0,0) == this.addDays(new Date(), 1).setHours(0,0,0,0)){
          var currentTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
         success.timeSlots = success.timeSlots.filter(x=> Date.parse(`01/01/2011 ${x.slotTime}`) > Date.parse(`01/01/2011 ${currentTime}`) )
        
        }
        
         this.timeSlots.morningSlots = success.timeSlots.filter(x=>x.type == 'M');
         this.timeSlots.afternoonSlots = success.timeSlots.filter(x=>x.type == 'A');
         this.timeSlots.eveningSlots = success.timeSlots.filter(x=>x.type == 'E');
         //alert("success 266")
      }
    }, (error)=>{

    });

  }

  submitSetupInterview(isQCPassed, paymentId){
    if(!this.selectedInterviewInfo.slot.id){
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Setup Interview", "Select slot to proceed");
      return false;
    }
    var requestObj = {
      "metadata":{
        "qcPassed": isQCPassed,
        "isInterviewerSelected": this.selectedInterviewInfo.interviewer.interviewerId ? true: false,
        "mode": this.setupInterviewMetadata.isEligibleForOffer ? "OFFER" :  
        (this.setupInterviewMetadata.membershipStatusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS && this.setupInterviewMetadata.interviewsRemaining > 0) ? "MEMBER" :
        null
    },
    "dateAndTime": `${this.formatDate(this.selectedInterviewInfo.interviewDate)}T${this.selectedInterviewInfo.slot.slotTime}:00`,
    "paymentId": paymentId,
    "consultantId": this.selectedInterviewInfo.interviewer.interviewerId  ? this.selectedInterviewInfo.interviewer.interviewerId : null,
    "interviewLevelId": this.StringtoJSON(this.setupInterviewForm.value.interviewLevel).id,
    "interviewLevelName": this.StringtoJSON(this.setupInterviewForm.value.interviewLevel).name,
    "technologyIds": this.setupInterviewForm.value.technologies,
    "slotId": this.selectedInterviewInfo.slot.id
    };

    console.log('Setup interview data: ', requestObj);

    this.commonService.submitSetupInterview(requestObj).subscribe((success)=>{
      if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){
        
        if(success.qcPassed){
          if(
            (this.setupInterviewMetadata.isEligibleForOffer && this.selectedInterviewInfo.isFreeSelected) || 
            (this.setupInterviewMetadata.membershipStatusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS && this.setupInterviewMetadata.interviewsRemaining > 0) ||
            (this.setupInterviewMetadata.isFirstInterview && this.selectedInterviewInfo.isFreeSelected)
            )
            {
              this.submitSetupInterview(true, "DUMMY");
            }
            else{
              this.payment(); 
            }
        }
        else{
          localStorage.setItem("successinterviewKey","successinterviewschedulesTrue")
          setTimeout(() => {
            //let setup_to_interview  
            location.href="interviews"
            //this.router.navigate(['/interviews']);
          //   this.route.queryParams.subscribe(params => {
          //     const selectedTab = params["tab"];
          //     //this.editProfileTabs.selectedIndex = selectedTab > 0 ? selectedTab : 0;
          //     //this.interviewsList.length
          // });
          }, 1000);
          
          // if(paymentId == "DUMMY"){
          //   //this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, "Setup Interview", "Interview scheduled successfully");
          //   //this.activeTab =1;
          // }
          // else{
          //   //this.interviewScheduledSuccess = true;
          //   //this.activeTab =1;
          //   //this.cdr.detectChanges();
          //   this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, "Setup Interview", "Interview scheduled successfully");
            
          //   //setTimeout(() => {
          //     //this.interviewScheduledSuccess = false;
          //     //this.cdr.detectChanges();
          //   //}, 3000);
          // }
          
          // //this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, "Setup Interview", "Interview scheduled successfully");
          // //debugger
          // //this.activeTab =1;
          // //this.cdr.detectChanges();
          // setTimeout(() => {
          //   //alert("successfully")
          //   this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, "Setup Interview", "Interview scheduled successfully");
          //   //location.href="setup-interview"

          // }, 5000);
          // setTimeout(() => {
          //  //this.activeTab =1;
          //   //this.cdr.detectChanges();
          //   location.href="setup-interview"

          // }, 8000);
        }
      }
      else if(success.errorCode == MyAppHttpService.RESPONSE_CODES.SETUP_INTERVIEW_DATE_SHOULD_BE_MORE_THAN_24HRS_FROM_NOW){
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Setup Interview", "Please select a date more than 24 hrs from now");
      }
      else if(success.errorCode == MyAppHttpService.RESPONSE_CODES.SETUP_INTERVIEW_TIME_SHOULD_NOT_BE_BETWEEN_12AM_AND_6AM){
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Setup Interview", "Interview cannot be scheduled between 10PM to 6AM");
      }
      else if(success.errorCode == MyAppHttpService.RESPONSE_CODES.SETUP_INTERVIEW_TIME_SHOULD_HAVE_2HR_GAP_FOR_INTERVIEW){
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Setup Interview", "Time gap between 2 interviews must be atleast 2 hours");
      }
      else if(success.errorCode == MyAppHttpService.RESPONSE_CODES.SETUP_INTERVIEW_DATE_IS_MORE_THAN_MAX_DAYS_FROM_TOMORROW){
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Setup Interview", "Interview can be scheduled to a maximum of 90 days from today.");
      }
      else if(success.errorCode == MyAppHttpService.RESPONSE_CODES.SLOT_BOOKED){
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, "Setup Interview", "Slot already blocked");
      }
    }, (error)=>{

    });

  }
  

  payment() {
    var self = this;
     let options = {
       description: 'Proceed Payment',//'value',
       image: environment.payment.image,
       currency: 'INR',
       key: environment.payment.key,
       amount: 100 * this.StringtoJSON(this.setupInterviewForm.value.interviewLevel).price,
       name: null,
       handler:  (success)=> {
         console.log("response: " + success);
         self.successCallback(success.razorpay_payment_id);
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
     //var rzp1 = new Razorpay(options);
     //rzp1.open();

     Razorpay.open(options, this.successCallback, this.paymentCancel);
   
 };

 successCallback(payment_id) {
  this.submitSetupInterview(true, payment_id);
 };

 MethodAfterCancel() {
   this.paymentCancel();
   console.log("cancelCallback error: ");
 }

 paymentCancel(){
   var requestObj = {
    module: "INTERVIEW"
  };
   this.commonService.paymentCancel(requestObj).subscribe(response =>{}, error =>{
    
   });
 }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  convertToYears(months){
    var yearsText = '';
    if(!!months){
      if(!(months/12 == 0)){
        yearsText = yearsText + `${Math.floor(months/12)} ` + `${Math.floor(months/12) == 1 ? 'Year' : 'Years '}` 
      }
      if(!(months%12 == 0)){
        yearsText = yearsText +  `${Math.floor(months%12)} ` + `${Math.floor(months%12) == 1 ? 'Month' : 'Months'}` 
      }
    }
    return yearsText;
  }

}
