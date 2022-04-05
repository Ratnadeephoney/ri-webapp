import { Component, OnInit,ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../shared/service/common.service';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IntFeedbackComponent } from './int-feedback/int-feedback.component';
import { JSFeedbackComponent } from './js-feedback/js-feedback.component';
import { ConfirmationPopupComponent } from '../../shared/components/pages/confirmation-popup/confirmation-popup.component';
import { PopoverContentComponent } from 'ngx-smart-popover';



@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InterviewsComponent implements OnInit {
  
  @ViewChild('skillsPopover') skillsPopover: PopoverContentComponent;

  selectedTab = 'JS';
  interviewsList = [];
  interviewStatusForInt = [
    { id: 7, value: 'All' },
    { id: 2, value: 'Scheduled' },
    { id: 4, value: 'Completed' },
    { id: 6, value: 'Cancelled' }
  ];
  interviewStatusForJS = [
    { id: 7, value: 'All' },
    { id: 2, value: 'Scheduled' },
    { id: 4, value: 'Completed' },
    { id: 6, value: 'Cancelled' }
  ];
  userData: any;
  interviewStatusIds;
  selectedStatusId;
  isDataLoaded: boolean;
  perPageItems = [5, 10, 15, 20, 25];
  paginationProps = { itemsPerPage: this.perPageItems[0], currentPage: 1, totalItems: 200 };
  meetingLinkStatusNA 
  meetingLinkStatusmeetLink
  meetingLing

  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService,
    public modalService: NgbModal,
    public commonService: CommonService,
    private router: Router) {
  }

  ngOnInit() {
    if(localStorage.getItem("successinterviewKey")== "successinterviewschedulesTrue")
    {
      
      setTimeout(() => {
        this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, "Setup Interview", "Interview scheduled successfully");
        localStorage.setItem("successinterviewKey","successinterviewschedulesFalse")
      }, 1000);
    }
    
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
    if (this.dataStorage.globalIsLoggedInUser) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
    }

    this.isDataLoaded = false;
    this.interviewStatusIds = MyAppHttpService.InterviewStatusIds;
    if (this.dataStorage.globalLoggedInUserData.userType == MyAppHttpService.Roles.INTERVIEWER.roleId) {
      this.selectedTab = MyAppHttpService.Roles.INTERVIEWER.roleName;
      this.getInterviews(0, this.interviewStatusIds.ALL_INTERVIEWS, MyAppHttpService.Roles.INTERVIEWER.roleName);
    } else {
      this.selectedTab = MyAppHttpService.Roles.JOB_SEEKER.roleName;
      this.getInterviews(0, this.interviewStatusIds.ALL_INTERVIEWS, MyAppHttpService.Roles.JOB_SEEKER.roleName);
    }
  }

  Tab1Selected() {
    console.log('Selected tab1');
    this.getInterviews(0, this.interviewStatusIds.ALL_INTERVIEWS, MyAppHttpService.Roles.INTERVIEWER.roleName);
    this.selectedTab = MyAppHttpService.Roles.INTERVIEWER.roleName;
  }

  Tab2Selected() {
    console.log('Selected tab2');
    this.getInterviews(0, this.interviewStatusIds.ALL_INTERVIEWS, MyAppHttpService.Roles.JOB_SEEKER.roleName);
    this.selectedTab = MyAppHttpService.Roles.JOB_SEEKER.roleName;
  }

  onPageChanges(event) {
    this.paginationProps.currentPage = event;
    this.interviewStatusIds = MyAppHttpService.InterviewStatusIds;
    this.getInterviews(this.paginationProps.itemsPerPage * (event - 1), this.interviewStatusIds.ALL_INTERVIEWS);
  }

  getInterviews(offset, filter, type = MyAppHttpService.Roles.JOB_SEEKER.roleName) {
    this.selectedStatusId = filter;
    if (this.dataStorage.globalIsLoggedInUser) {
      var requestObj = {
        "skills": this.dataStorage.globalSelectedSKillsList ? this.dataStorage.globalSelectedSKillsList : [],
        "locationIds": this.dataStorage.globalSelectedLocationsList ? this.dataStorage.globalSelectedLocationsList : [],
        "limit": this.paginationProps.itemsPerPage,
        "offset": offset
      };
      this.commonService.getAllInterviews(requestObj, filter, type).subscribe(response => {
        console.log('interviews response: ', response);
        this.isDataLoaded = true;
        if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
          // response.interviewsList.technologyNames = response.interviewsList.technologies.map(x => x.name);
          response.interviewsList.forEach(element => {
            let technologyNames = [];
            element.technologies.forEach(tech => {
              technologyNames.push(tech.name);
            });
            element.technologyNames = technologyNames;
            MyAppHttpService.InterviewStatus.forEach(st => {
              // if (st.id == element.status) {
                if (st.id == element.originalDbStatus) {
                element.interviewStatus = st.value;
              }
            });
            if (this.userData.userType == 2) {
              if (!!element.resumePath) {
                element.resumeName = element.resumePath.substring(element.resumePath.lastIndexOf('/') + 1);
              }
              if(this.selectedTab == MyAppHttpService.Roles.INTERVIEWER.roleName) {
                // debugger
                if(element.originalDbStatus == 6) {
                  element.interviewStatus = 'Cancelled by You';
                }
              }
            }
          });
          this.interviewsList = response.interviewsList;
          console.log('Interviews list : ', this.interviewsList);
        }
        else {
          this.interviewsList = [];
        }
      });
      // }
    }
  }
  getInterviewerFeedback(interview) {
    let usertype: any = 1;
    if (this.selectedTab == 'JS') {
      usertype = 1;
    } else {
      usertype = 2;
    }
    let modalRef = this.modalService.open(IntFeedbackComponent);
    modalRef.componentInstance.data = { interviewDetails: interview, userType: usertype };
    modalRef.result.then((e) => {
      if (e == true) {
        if (usertype == 1) {
          this.getInterviews(0, this.interviewStatusIds.ALL_INTERVIEWS, MyAppHttpService.Roles.JOB_SEEKER.roleName);
        } else if (usertype == 2) {
          this.getInterviews(0, this.interviewStatusIds.ALL_INTERVIEWS, MyAppHttpService.Roles.INTERVIEWER.roleName);
        }
      }
    });
  }

  getJobseekerFeedback(interview) {
    let usertype: any = 1;
    if (this.selectedTab == 'JS') {
      usertype = 1;
    } else {
      usertype = 2;
    }
    let modalRef = this.modalService.open(JSFeedbackComponent);
    modalRef.componentInstance.data = { interviewDetails: interview, userType: usertype };
    modalRef.result.then((e) => {
      if (e == true) {
        if (usertype == 1) {
          this.getInterviews(0, this.interviewStatusIds.ALL_INTERVIEWS, MyAppHttpService.Roles.JOB_SEEKER.roleName);
        } else if (usertype == 2) {
          this.getInterviews(0, this.interviewStatusIds.ALL_INTERVIEWS, MyAppHttpService.Roles.INTERVIEWER.roleName);
        }
      }
    });
  }

  cancelInterview(interview) {
    console.log('Cancel interview', interview);
    let confirmModalRef = this.modalService.open(ConfirmationPopupComponent);
    confirmModalRef.componentInstance.data = { contentText: 'Are you sure you want to Cancel the interview ?' }

    confirmModalRef.result.then((value) => {
      console.log('value : ', value);
      if (value == true) {
        let requestData = {
          interviewId: interview.interviewId
        };
        this.commonService.cancelInterview(requestData).subscribe(response => {
          console.log('Cancel interview response: ', response);
          if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
            this.getInterviews(0, this.interviewStatusIds.ALL_INTERVIEWS, this.selectedTab);
          }
        });
      }
    });
  }

  addInterview() {
    this.router.navigate([MyAppHttpService.PathInformation.SETUP_INTERVIEW.PATH]);
  }
  downloadResume(resumePath) {
    if (!!resumePath) {
      window.open(resumePath);
    }
  }

  onTabChange(event){
    if(event.nextId == 'tFirst'){
      this.Tab1Selected();
    }
    else{
      this.Tab2Selected();
    }
  }


}
