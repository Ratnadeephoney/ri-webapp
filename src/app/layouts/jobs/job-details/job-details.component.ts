import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbTab, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { UserLoginComponent } from '../../../shared/components/pages/user-login/user-login.component'
import { UserRegistrationComponent } from '../../../shared/components/pages/user-registration/user-registration.component';
import { CommonService } from '../../../shared/service/common.service';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { MyAppHttpService } from '../../../shared/service/my-app-http.service';
import { AlertCompComponent } from '../../alert-comp/alert-comp.component';
import { ToscheduleInterviewComponent } from '../toschedule-interview/toschedule-interview.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobDetailsComponent implements OnInit {

  data;
  Screenready: boolean = false;
  dataforshowing: any;
  ShowMore: boolean = false;
  @ViewChild('tabSet') tabSet: NgbTabset;
  externallink: boolean = false;
  showplay: boolean = false;
  constructor(public activeModal: NgbActiveModal, public dataStorage: DataStorageService, private commonService: CommonService,
    public modalService: NgbModal, private _clipboardService: ClipboardService, private router: Router) {

  }

  ngOnInit(): void {
    console.log('job details', this.data, this.data.JobData);
    this.dataforshowing = this.data.JobData;
    this.Screenready = true;
    setTimeout(() => {
      this.tabSet.select("tFirst");
    }, 2000);

  }

  onTabChange(event) {
    this.ShowMore = false;
  }

  onModalDismiss() {
    if (this.dataforshowing.isApplied == true) {
      this.activeModal.close(true);
    } else {
      this.activeModal.close(false);
    }
  }

  CopyJob() {
    console.log('job needs to copy');
    let url = window.location.origin + '/job-details?jobId=' + this.dataforshowing.jobId;
    console.log('Url', url);
    this._clipboardService.copy(url);
    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Copy URL', 'Copied to Clipboard');
    this.ShowMore = false;
  }

  ShareJob() {
    console.log('job needs to share');
  }

  MoreOptionsClick() {
    console.log('fired more options');
    this.ShowMore = !this.ShowMore;
  }

  applyJob() {
    // console.log('Selected job details : ', selectedJobDetails);
    // this.modalService.open(UserLoginComponent);
    this.ShowMore = false;
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
          // if (this.dataStorage.totalInterviewsCount == 0) {
          let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
          modalRef.result.then((result) => {
            console.log('Result: ', result);
            if (result == true) {
              this.activeModal.dismiss(false);
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
      var modalRefLogin = this.modalService.open(UserLoginComponent, this.dataStorage.globalNgbModalOptions);
      modalRefLogin.componentInstance.data = { operation: null };

      modalRefLogin.result.then((e) => {
        console.log('data from login', e, e.returnObj, e.returnObj.length, e.returnObj.response);
        if (e.returnObj && e.returnObj.response) {
          if (e.returnObj.response.statusCode == 200) {
            this.dataStorage.UserLoggedIn = true;
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
                    if (e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.USER_NOT_EXISTS) {
                      console.log('fired here 4');
                      if (e.returnObj.response.statusMessage != 'You can not apply to disabled jobs') {

                        let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
                        modalRef.result.then((result) => {
                          console.log('Result: ', result);
                          if (result == true) {
                            this.activeModal.dismiss(false);
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
                    }
                    else if (e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                      console.log('fired here 5');
                      if (e.returnObj.response.statusMessage != 'You can not apply to disabled jobs') {
                        let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
                        modalRef.result.then((result) => {
                          console.log('Result: ', result);
                          if (result == true) {
                            this.activeModal.dismiss(false);
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
                    }
                  }
                })
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

    event.stopPropagation();
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
