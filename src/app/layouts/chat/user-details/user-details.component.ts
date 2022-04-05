import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbTab, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { UserLoginComponent } from 'src/app/shared/components/pages/user-login/user-login.component';
import { UserRegistrationComponent } from 'src/app/shared/components/pages/user-registration/user-registration.component';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent implements OnInit {

  Dataformodal;
  Screenready: boolean = false;
  dataforshowing: any;
  ShowMore: boolean = false;
  Rating = 4;
  userData;
  userType;
  typeOfUser: any;
  data;
  public userDetails: any = {
    name: 'Sneha QA',
    userRole: 'Jobseeker',
    technologies: 'Angular, Java, Ionic, Angular, Java, Ionic, Angular, Java, Ionic, Angular, Java, Ionic, Angular, Java, Ionic, Angular, Java, Ionic, Angular, Java, Ionic, Angular, Java, Ionic, Angular, Java, Ionic, Angular, Java, Ionic, ',
    experience: 36,
    interviewsTaken: 5,
    rating: 4
  };

  employerDetails: any = {
    companyName: 'Rock Interview',
    website: 'https://www.rockinterview.in',
    video: 'https://www.youtube.com/watch?v=Cud39QOR_Pk',
    aboutCompany: 'Why should you join us ? I dont know Why should you join us ? I dont know Why should you join us ? I dont know Why should you join us ? I dont know '
  }
  constructor(public activeModal: NgbActiveModal, public dataStorage: DataStorageService, private commonService: CommonService,
    public modalService: NgbModal, private _clipboardService: ClipboardService) {
    console.log('dddd', this.Dataformodal);
  }

  ngOnInit(): void {
    console.log('job details', this.data, this.data.DataNew);
    this.userData = this.data.DataNew.userData;
    this.typeOfUser = this.data.DataNew.userType;
    console.log('constructor User data 1 : ', this.userData, this.typeOfUser);
    if (!!this.userData) {
      if (!!this.typeOfUser) {
        if (this.typeOfUser == 'group') {
          if (this.userData.interviewerDetails != null) {
            console.log('if', this.userData.interviewerDetails);
            this.userDetails = this.userData.interviewerDetails[0].userDetails;
            // this.userDetails.userRole = 'Interviewer';
            this.userDetails.interviewsTaken = this.userData.interviewerDetails[0].interviewDetails.interviewsCompleted;
            this.userDetails.rating = this.userData.interviewerDetails[0].interviewDetails.interviewerRating;
            this.userDetails.previousCompany = this.userData.interviewerDetails[0].userAdditionalDetailsDto.previousCompany;
          }
          else if (this.userData.jobseekerDetails != null) {
            console.log('else if', this.userData.jobseekerDetails);
            this.userDetails = this.userData.jobseekerDetails[0].userDetails;
            this.userDetails.previousCompany = this.userData.jobseekerDetails[0].userAdditionalDetailsDto.previousCompany;
            // this.userDetails.userRole = 'Jobseeker';
          }
        }
        else {
          // if (this.userData.whyJoinUs != '' || this.userData.whyJoinUs != null) {
          //   this.userData.whyJoinUs = this.urlify(this.userData.whyJoinUs);
          //   this.employerDetails = this.userData;
          //   this.userDetails.userName = this.userData.fullName;
          // } else {
          this.employerDetails = this.userData;
          this.userDetails.userName = this.userData.fullName;
          // }
        }
      }
      console.log('User details : ', this.userDetails);
    }
    // this.dataforshowing = this.Dataformodal;
    this.Screenready = true;

  }

  Navigatetobrowser(url) {
    console.log('url', url);

    if(url){
      if (!url.match(/^https?:\/\//i)) {
        url = 'http://' + url;
      }
      window.open(url);
    }
    else{
      return '';
    }

   
  }

  onModalDismiss() {
    this.activeModal.close(true);
  }

  convertToYandM(months): string {

    if (!months || months == '-1' || months == '0') {

      return ("");

    } else {

      let yearCalculated: any = (months / 12 | 0);
      let monthCalculated: any = (months % 12 | 0);

      // yearCalculated =  (yearCalculated == 0 || yearCalculated == -1) ? "" : yearCalculated + " y  " ;
      // monthCalculated = (monthCalculated == 0 || monthCalculated == -1) ? "" : monthCalculated + " m ";
      yearCalculated = yearCalculated + " years  ";
      if (monthCalculated != 0) {
        monthCalculated = monthCalculated + " months ";
      }
      if (monthCalculated != 0) {
        return (yearCalculated + monthCalculated);
      } else {
        return yearCalculated;
      }
    }
  }


}
