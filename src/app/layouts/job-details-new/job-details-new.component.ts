import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginComponent } from 'src/app/shared/components/pages/user-login/user-login.component';
import { UserRegistrationComponent } from 'src/app/shared/components/pages/user-registration/user-registration.component';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { environment } from 'src/environments/environment';
import { AlertCompComponent } from '../alert-comp/alert-comp.component';
import { ToscheduleInterviewComponent } from '../jobs/toschedule-interview/toschedule-interview.component';

@Component({
  selector: 'app-job-details-new',
  templateUrl: './job-details-new.component.html',
  styleUrls: ['./job-details-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobDetailsNewComponent implements OnInit {

  JobId: any = null;

  ScreenEnable: boolean = false;

  dataforshowing: any;

  ShowMore: boolean = false;

  externallink: boolean = false;
  showplay: boolean = false;
  title: any;
  description: string;
  isDataLoaded: boolean;

  constructor(private route: ActivatedRoute, private commonService: CommonService, public dataStorage: DataStorageService,
    public modalService: NgbModal, private titleService: Title, private meta: Meta, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log('params: ', params)
      if (!!params.jobId) {
        this.JobId = params.jobId
        console.log('Job ID: ', this.JobId);
        this.GetJobDetailsById();
      }
    });
  }

  ngOnInit(): void {
    this.commonService.getTotalInterviewsCount();
    this.GetJobDetailsById();
    // this.meta.addTag();
    // console.log('firing oninit for meta update', this.dataforshowing.jobTitle);
    // this.titleService.setTitle('Rock Interview Jobs | ' + this.dataforshowing.jobTitle);
    // this.meta.addTag({ name: 'og:title', property: 'og:title', content: this.dataforshowing.jobTitle });
    // this.meta.addTag({ name: 'og:description', property: 'og:description', content: 'Apply to ' + this.dataforshowing.jobTitle + ' job from Rock Interview App' });
  }

  GetJobDetailsById() {
    var requestObj = {
      "jobId": this.JobId,
      "isJOD": false
    };
    // this.applyingEmployerName = '';
    this.commonService.getSelectedJobByJobId(requestObj).subscribe(success => {
      if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        console.log('Job Details by Id', success);
        this.dataforshowing = success.jobDetails;
        this.ScreenEnable = true;
        this.isDataLoaded = true;
        let company = this.dataforshowing.company ? this.dataforshowing.company.toUpperCase() : 'Rock Interview';
        let a = company + ' is hiring ' + this.dataforshowing.jobTitle + ' - Apply Now!';
        this.title = a;
        this.description = 'Apply to ' + this.dataforshowing.jobTitle + ' job from Rock Interview App'
        console.log('title: ', this.title);
        this.titleService.setTitle(this.title);
        this.meta.addTag({ name: 'og:title', property: 'og:title', content: this.title });
        this.meta.addTag({ name: 'og:description', property: 'og:description', content: this.description });
        
        this.meta.addTag({ name: 'twitter:title', property: 'twitter:title', content: this.title });
        this.meta.addTag({ name: 'twitter:description', property: 'twitter:description', content: this.description });
        // this.meta.addTag({ name: 'og:image', property: 'og:image', content: 'assets/imgs/ri/ri_logo.jpg'});
        this.updateChromeTitle();
      }
      else {
        this.title = 'Rock Interview | No Job Found';
        this.titleService.setTitle(this.title);
        this.description = "Rock Interview Jobs";
        this.meta.addTag({ name: 'og:title', property: 'og:title', content: this.title });
        this.meta.addTag({ name: 'og:description', property: 'og:description', content: this.description });
        
        this.meta.addTag({ name: 'twitter:title', property: 'twitter:title', content: this.title });
        this.meta.addTag({ name: 'twitter:description', property: 'twitter:description', content: this.description });
      }
    })
  }

  updateChromeTitle() {
    // this.title = (this.dataforshowing.company ? this.dataforshowing.company.toUpperCase() : 'Rock Interview') + ' is hiring ' + this.dataforshowing.jobTitle + ' - Apply Now!'
    this.titleService.setTitle(this.title);
    // this.meta.updateTag({ name: 'og:title', property: 'og:title', content: 'We are hiring ' + this.dataforshowing.jobTitle + ' at ' + this.dataforshowing.company + ' - Apply Now! #Job' });
    this.meta.updateTag({ name: 'og:title', property: 'og:title', content: this.title});
    this.meta.updateTag({ name: 'og:description', property: 'og:description', content: 'Apply to ' + this.dataforshowing.jobTitle + ' job from Rock Interview App' });
    
    this.meta.updateTag({ name: 'twitter:title', property: 'twitter:title', content: this.title });
    this.meta.updateTag({ name: 'twitter:description', property: 'twitter:description', content: 'Apply to ' + this.dataforshowing.jobTitle + ' job from Rock Interview App' });
    // this.meta.updateTag({ name: 'og:image', property: 'og:title',content: 'https://lh3.googleusercontent.com/-qm9T2ztCy7E/X-_38YTD_eI/AAAAAAAAFsw/ECcwA3j398gxB_NzULzXeiLEzWN5u7xtACK8BGAsYHg/s0/2021-01-01.png' });
  }

  applyJob() {
    // console.log('Selected job details : ', selectedJobDetails);
    // this.modalService.open(UserLoginComponent);
    // let dataforsending: any = {};
    // dataforsending.header = 'Apply Job';
    // dataforsending.message = 'Are you sure you want to apply this job?';
    // dataforsending.button1 = 'Cancel';
    // dataforsending.button2 = 'Apply';
    // let modalRef = this.modalService.open(AlertCompComponent, { centered: true });
    // modalRef.componentInstance.data = { AlertData: dataforsending };
    // modalRef.result.then((e) => {
    //   if (e == true) {
    if (this.dataStorage.globalIsLoggedInUser) {
      let dataforsending: any = {};
      dataforsending.header = 'Apply Job';
      dataforsending.message = 'Are you sure you want to apply this job?';
      dataforsending.button1 = 'Cancel';
      dataforsending.button2 = 'Apply';
      let modalRef = this.modalService.open(AlertCompComponent, { centered: true });
      modalRef.componentInstance.data = { AlertData: dataforsending };
      modalRef.result.then((h) => {
        if (h == true) {
          console.log('fired here 1');
          // if (this.dataStorage.totalInterviewsCount == 0) {
          let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
          modalRef.result.then((result) => {
            console.log('Result: ', result);
            if (result == true) {
              this.router.navigate(['/setup-interview']);
            }
            else if (result == false) {
              this.commonService.applyJob({ jobId: this.dataforshowing.jobId }).subscribe(response => {
                if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                  this.dataforshowing.isApplied = true;
                  this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Apply Job', 'Job applied successfully');
                }
                else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
                  // this.applyingEmployerName = response.applyingEmployerName;
                  this.dataforshowing.isApplied = true;
                  this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
                }
                else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.JOB_APPLY_INACTIVE) {
                  this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', "Cannot apply to inactive job");
                }
              }, error => {

              });
            }
          });
          // }
          // else {
          //   this.commonService.applyJob({ jobId: this.dataforshowing.jobId }).subscribe(response => {
          //     if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
          //       this.dataforshowing.isApplied = true;
          //       this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Apply Job', 'Job applied successfully');
          //     }
          //     else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
          //       // this.applyingEmployerName = response.applyingEmployerName;
          //       this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
          //     }
          //     else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.JOB_APPLY_INACTIVE) {
          //       this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', "Cannot apply to inactive job");
          //     }
          //   }, error => {

          //   });
          // }

        }
      })
    }
    else {
      console.log('fired here 2');
      var modalRefLogin = this.modalService.open(UserLoginComponent, this.dataStorage.globalNgbModalOptions);
      // modalRefLogin.componentInstance.data = { operation: true, jobData: { jobId: this.dataforshowing.jobId } };
      modalRefLogin.componentInstance.data = { operation: null };

      modalRefLogin.result.then((e) => {
        if (e.returnObj && e.returnObj.response) {
          if (e.returnObj.response.statusCode == 200) {
            var requestObj = {
              "jobId": this.dataforshowing.jobId,
              "isJOD": this.dataforshowing.isJOD
            };
            // this.applyingEmployerName = '';
            this.commonService.getSelectedJobByJobId(requestObj).subscribe(success => {
              console.log('success 1', success);
              if (success.jobDetails.isApplied == false) {
                let dataforsending: any = {};
                dataforsending.header = 'Apply Job';
                dataforsending.message = 'Are you sure you want to apply this job?';
                dataforsending.button1 = 'Cancel';
                dataforsending.button2 = 'Apply';
                let modalRef = this.modalService.open(AlertCompComponent, { centered: true });
                modalRef.componentInstance.data = { AlertData: dataforsending };
                modalRef.result.then((j) => {
                  if (j == true) {
                    console.log('fired here 3', e);
                    setTimeout(() => {
                      this.GetJobDetailsById();
                    }, 500);
                    console.log('is applied value: ', this.dataforshowing.isApplied);
                    setTimeout(() => {
                      if (!this.dataforshowing.isApplied) {
                        if (e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.USER_NOT_EXISTS) {
                          console.log('fired here 4');
                          // var modalRefRegistration = this.modalService.open(UserRegistrationComponent, this.dataStorage.globalNgbModalOptions);
                          // modalRefRegistration.componentInstance.data = { mobileNumber: e.returnObj.mobileNumber, sessionId: e.returnObj.sessionId, operation: true, jobData: { jobId: this.dataforshowing.jobId }, trainingData: null };
                          // modalRefRegistration.result.then((e) => {
                          // this.applyingEmployerName = e.jobOperation.applyingEmployerName;
                          if (e.returnObj.response.statusMessage != 'You can not apply to disabled jobs') {
                            // this.dataforshowing.isApplied = true;

                            let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
                            modalRef.result.then((result) => {
                              console.log('Result: ', result);
                              if (result == true) {
                                this.router.navigate(['/setup-interview']);
                              }
                              else if (result == false) {
                                console.log('inner else');
                                this.commonService.applyJob({ jobId: this.dataforshowing.jobId }).subscribe(response => {
                                  if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                                    this.dataforshowing.isApplied = true;
                                    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Apply Job', 'Job applied successfully');
                                  }
                                  else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
                                    // this.applyingEmployerName = response.applyingEmployerName;
                                    this.dataforshowing.isApplied = true;
                                    this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
                                  }
                                  else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.JOB_APPLY_INACTIVE) {
                                    this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', "Cannot apply to inactive job");
                                  }
                                }, error => {

                                });
                              }
                            });
                          }
                          // });
                        }
                        else if (e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                          console.log('fired here 5');
                          if (e.returnObj.response.statusMessage != 'You can not apply to disabled jobs') {
                            // this.dataforshowing.isApplied = true;
                            let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
                            modalRef.result.then((result) => {
                              console.log('Result: ', result);
                              if (result == true) {
                                this.router.navigate(['/setup-interview']);
                              }
                              else if (result == false) {
                                console.log('inner else');
                                this.commonService.applyJob({ jobId: this.dataforshowing.jobId }).subscribe(response => {
                                  if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                                    this.dataforshowing.isApplied = true;
                                    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Apply Job', 'Job applied successfully');
                                  }
                                  else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
                                    // this.applyingEmployerName = response.applyingEmployerName;
                                    this.dataforshowing.isApplied = true;
                                    this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
                                  }
                                  else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.JOB_APPLY_INACTIVE) {
                                    this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', "Cannot apply to inactive job");
                                  }
                                }, error => {

                                });
                              }
                            });
                          }
                          // this.applyingEmployerName = e.returnObj.response.requestData.jobOperation.applyingEmployerName;
                        }
                      }
                      else {
                        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
                      }
                    }, 1500);
                  }
                });
              } else {
                if (success.jobDetails.applyingEmployerName == null) {
                  this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
                } else {
                  this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied by' + success.jobDetails.applyingEmployerName);
                }
                this.dataforshowing.isApplied = true;
              }
            });
          }
        }
      });
    }
    //   }
    // });

  }

  YouTubeGetImage(link) {
    // link = 'https://www.youtube.com/watch?v=qm_wPS9HOmg';
    // debugger
    if (!!link) {
      let regexlink = /^((https?|ftp|smtp):\/\/)?(www.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
      let matchlink = link.match(regexlink);
      console.log('regex link matching', matchlink);
      // let matchlink = link.match('youtube');
      console.log('string match', matchlink);
      if (matchlink != null) {
        console.log('fired video');
        let id = this.YouTubeGetID(link);
        console.log('Id from id', id);
        let url = 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
        this.showplay = true;
        this.externallink = false;
        return url;
      } else {
        console.log('fired no video');
        this.externallink = true;
        return null;
      }
    }
  }

  YouTubeGetID(url) {
    // debugger
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = url;
    }
    console.log('returning id', ID);
    return ID;
  }

  playvideo(link) {
    window.open(link);
  }

}
