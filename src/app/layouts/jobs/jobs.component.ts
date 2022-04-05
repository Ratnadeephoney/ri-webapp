import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../shared/service/common.service';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';
import { NgbModal, NgbTab, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { DownloadAppComponent } from '../../shared/components/pages/download-app/download-app.component';
import { JODModalComponent } from '../../shared/components/pages/jod-modal/jod-modal.component';
import { UserLoginComponent } from '../../shared/components/pages/user-login/user-login.component';
import { UserRegistrationComponent } from '../../shared/components/pages/user-registration/user-registration.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { Location } from '@angular/common';
import { ClipboardService } from 'ngx-clipboard';
import { ToscheduleInterviewComponent } from './toschedule-interview/toschedule-interview.component';
import { Router } from '@angular/router';
import { AlertCompComponent } from '../alert-comp/alert-comp.component';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobsComponent implements OnInit {

  searchForm: FormGroup;
  jobsList = [];
  selectedJob;
  isJODForSelectedJob;
  perPageItems = [5, 10, 15, 20, 25];
  selectedPage = this.perPageItems[1];
  paginationProps = { itemsPerPage: this.perPageItems[1], currentPage: 1, totalItems: 200 };
  @ViewChild('tabSet') tabSet: NgbTabset;

  applyingEmployerName;
  offset: any = 0;

  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    private location: Location,
    public dataStorage: DataStorageService,
    private commonService: CommonService,
    public modalService: NgbModal,
    private _clipboardService: ClipboardService,
    private router: Router) {
    this.dataStorage.loggedInFromMenu.subscribe(value => {
      console.log('Fired after log in jobs', value);
      if (value == true) {
        this.offset = 0
        this.getAllJobs(this.offset);
      }
    })
  }

  ngOnInit() {
  
    
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
    this.searchForm = new FormBuilder().group({
      'skills': [""],
      'locations': [""]
    });

    // this.searchForm.controls['skills'].setValue(this.dataStorage.globalSelectedSKillsList);
    // this.searchForm.controls['locations'].setValue(this.dataStorage.globalSelectedLocationsList);
    // this.getAllJobs(0);

    // this.searchForm.controls['skills'].valueChanges.subscribe((value) => {
    //   this.dataStorage.globalSelectedSKillsList = value;
    // });
    // this.searchForm.controls['locations'].valueChanges.subscribe((value) => {
    //   this.dataStorage.globalSelectedLocationsList = value;
    // });

    this.route.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.skills) {
        if (this.dataStorage.globalSkillsList == null) {
          this.commonService.getAllSkills().subscribe(success => {
            console.log('skills list', success);
            this.dataStorage.globalSkillsList = success.listOfTechnologies;
            this.dataStorage.globalSelectedSKillsList = this.GettingSkillIdsUsingNames(params.skills.split(','));
          })
        } else {
          this.dataStorage.globalSelectedSKillsList = this.GettingSkillIdsUsingNames(params.skills.split(','));
        }
        // this.dataStorage.globalSelectedSKillsList = params.skills.split(',').map(Number);

        //this.dataStorage.globalSelectedSKillsList  =this.dataStorage.globalSkillsList.filter(x=> params.skills.split(',').indexOf(x.skillId.toString()) > -1)

      }
      if (params.locations) {
        if (this.dataStorage.globalLocationsList == null) {
          this.commonService.getAllLocations().subscribe(success => {
            console.log('locations list', success);
            this.dataStorage.globalLocationsList = success.listOfLocations;
            this.dataStorage.globalSelectedLocationsList = this.GettingLocationIdsUsingNames(params.locations.split(',')).map(Number);
            console.log('Selected Locations list', this.dataStorage.globalSelectedLocationsList);
          })
        } else {
          this.dataStorage.globalSelectedLocationsList = this.GettingLocationIdsUsingNames(params.locations.split(',')).map(Number);
        }
      }
      setTimeout(() => {
        this.onLoad();
      }, 1000);
      // this.onLoad();
    });

    // this.modalService.open(ToscheduleInterviewComponent, { centered: true });
  }

  onLoad() {
    this.searchForm.controls['skills'].setValue(this.dataStorage.globalSelectedSKillsList);
    // console.log('Skills value: ', this.searchForm.controls.skills.value, this.dataStorage.globalSelectedSKillsList);;
    this.searchForm.controls['locations'].setValue(this.dataStorage.globalSelectedLocationsList);
    this.offset = 0;
    this.getAllJobs(this.offset);

    this.searchForm.controls['skills'].valueChanges.subscribe((value) => {
      this.dataStorage.globalSelectedSKillsList = value;
    });
    this.searchForm.controls['locations'].valueChanges.subscribe((value) => {
      this.dataStorage.globalSelectedLocationsList = value;
    });

    // this.commonService.getTotalInterviewsCount();
    // console.log('Interviews count: ', this.dataStorage.totalInterviewsCount);
  }

  readJob(job) {
    // var requestObj = {
    //   "jobId": job.jobId,
    //   "isJOD": job.isJOD
    // };
    // this.commonService.getSelectedJobByJobId(requestObj).subscribe(success => {
    //   if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
    //     if(success.jobDetails.jobRead){
    //       // this.dataStorage.globalTotalJobsCount--;
    //       job.isJobRead = true;
    //     }
    //   }
    // });

    var requestObj = {
      "jodId": job.jobId
    }

    this.commonService.MarkJobAsRead(requestObj).subscribe(success => {
      if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        if (success.isJobRead) {
          job.isNew = false;
        }
      }
    })
  }


  isDataLoaded = false;
  getAllJobs(offset) {
    var requestObj = {
      "skills": this.dataStorage.globalSelectedSKillsList ? this.dataStorage.globalSelectedSKillsList : [],
      "locationIds": this.dataStorage.globalSelectedLocationsList ? this.dataStorage.globalSelectedLocationsList : [],
      "limit": this.paginationProps.itemsPerPage,
      "offset": offset
    };
    this.isDataLoaded = false;
    this.commonService.getAllSearchedJobs(requestObj).subscribe(success => {
      this.isDataLoaded = true;
      console.log('data from jobs', success);
      if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        // this.jobsList = success.jobsList;
        this.UpdatingJobsList(success.jobsList);
        this.selectedJob = {};
        this.paginationProps.totalItems = success.totalResults > 200 ? 200 : success.totalResults;
        // this.getSelectedJobById(this.jobsList[0]);
        // if (this.dataStorage.globalSelectedSKillsList && this.dataStorage.globalSelectedSKillsList.length != 0)
        //   this.location.replaceState(`${this.dataStorage.globalPathInformation.JOBS.PATH}?skills=${this.dataStorage.globalSelectedSKillsList.join(',')}`);
        console.log('Selected data', this.dataStorage.globalSelectedSKillsList, this.dataStorage.globalSelectedLocationsList);
        // if(this.dataStorage.globalSelectedSKillsList == undefined){
        //   this.dataStorage.globalSelectedSKillsList = [];
        // }
        // if(this.dataStorage.globalSelectedLocationsList == undefined){
        //   this.dataStorage.globalSelectedLocationsList = [];
        // }
        // if (this.dataStorage.globalSelectedSKillsList && this.dataStorage.globalSelectedSKillsList.length != 0 && this.dataStorage.globalSelectedLocationsList && this.dataStorage.globalSelectedLocationsList.length != 0) {
        //   this.location.replaceState(`${this.dataStorage.globalPathInformation.JOBS.PATH}?skills=${this.GettingSkillNamesUsingIds(this.dataStorage.globalSelectedSKillsList).join(',')}&locations=${this.GettingLocationNamesUsingIds(this.dataStorage.globalSelectedLocationsList).join(',')}`);
        // } else if (this.dataStorage.globalSelectedSKillsList && this.dataStorage.globalSelectedSKillsList.length != 0) {
        //   this.location.replaceState(`${this.dataStorage.globalPathInformation.JOBS.PATH}?skills=${this.GettingSkillNamesUsingIds(this.dataStorage.globalSelectedSKillsList).join(',')}`);
        // } else if (this.dataStorage.globalSelectedLocationsList && this.dataStorage.globalSelectedLocationsList.length != 0) {
        //   this.location.replaceState(`${this.dataStorage.globalPathInformation.JOBS.PATH}?locations=${this.GettingLocationNamesUsingIds(this.dataStorage.globalSelectedLocationsList).join(',')}`);
        // } else if (this.dataStorage.globalSelectedSKillsList.length == 0 && this.dataStorage.globalSelectedLocationsList.length == 0){
        //   this.location.replaceState(`${this.dataStorage.globalPathInformation.JOBS.PATH}`);
        // }
        // this.GettingSkillNamesUsingIds(this.dataStorage.globalSelectedSKillsList);
        document.getElementById('results') &&
          (document.getElementById('results').scrollTop = 0);
      }
      else {
        this.jobsList = [];

      }
      if (this.dataStorage.globalSelectedSKillsList == undefined) {
        this.dataStorage.globalSelectedSKillsList = [];
      }
      if (this.dataStorage.globalSelectedLocationsList == undefined) {
        this.dataStorage.globalSelectedLocationsList = [];
      }
      if (this.dataStorage.globalSelectedSKillsList && this.dataStorage.globalSelectedSKillsList.length != 0 && this.dataStorage.globalSelectedLocationsList && this.dataStorage.globalSelectedLocationsList.length != 0) {
        this.location.replaceState(`${this.dataStorage.globalPathInformation.JOBS.PATH}?skills=${this.GettingSkillNamesUsingIds(this.dataStorage.globalSelectedSKillsList).join(',')}&locations=${this.GettingLocationNamesUsingIds(this.dataStorage.globalSelectedLocationsList).join(',')}`);
      } else if (this.dataStorage.globalSelectedSKillsList && this.dataStorage.globalSelectedSKillsList.length != 0) {
        this.location.replaceState(`${this.dataStorage.globalPathInformation.JOBS.PATH}?skills=${this.GettingSkillNamesUsingIds(this.dataStorage.globalSelectedSKillsList).join(',')}`);
      } else if (this.dataStorage.globalSelectedLocationsList && this.dataStorage.globalSelectedLocationsList.length != 0) {
        this.location.replaceState(`${this.dataStorage.globalPathInformation.JOBS.PATH}?locations=${this.GettingLocationNamesUsingIds(this.dataStorage.globalSelectedLocationsList).join(',')}`);
      } else if (this.dataStorage.globalSelectedSKillsList.length == 0 && this.dataStorage.globalSelectedLocationsList.length == 0) {
        this.location.replaceState(`${this.dataStorage.globalPathInformation.JOBS.PATH}`);
      }
    }, error => {

    });
  }

  UpdatingJobsList(Jobslist) {
    for (let i = 0; i < Jobslist.length; i++) {
      Jobslist[i].ShowMore = false;
    }
    this.jobsList = Jobslist;
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


  GettingLocationNamesUsingIds(IdsList) {
    let LocationnameList: any = [];
    console.log('Location Ids List', IdsList);
    if (this.dataStorage.globalLocationsList.length > 0) {
      for (let i = 0; i < IdsList.length; i++) {
        for (let j = 0; j < this.dataStorage.globalLocationsList.length; j++) {
          if (IdsList[i] == this.dataStorage.globalLocationsList[j].locationId) {
            let locdesc = JSON.parse(JSON.stringify(this.dataStorage.globalLocationsList[j].locationName));
            locdesc = locdesc.split(" ").join("-");
            LocationnameList.push(locdesc);
          }
        }
      }
    }
    console.log('skill names list', LocationnameList);
    return LocationnameList;
  }

  GettingLocationIdsUsingNames(NamesList) {
    console.log('Location names list', NamesList);
    let LocationIdsList: any = [];
    if (this.dataStorage.globalLocationsList.length > 0) {
      for (let i = 0; i < NamesList.length; i++) {
        for (let j = 0; j < this.dataStorage.globalLocationsList.length; j++) {
          let locdesc = JSON.parse(JSON.stringify(this.dataStorage.globalLocationsList[j].locationName));
          locdesc = locdesc.split(" ").join("-");
          if (NamesList[i] == locdesc) {
            LocationIdsList.push(this.dataStorage.globalLocationsList[j].locationId);
          }
        }
      }
    }
    console.log('location Ids list', LocationIdsList);
    return LocationIdsList;
  }


  getSelectedJobById(job) {
    var requestObj = {
      "jobId": job.jobId,
      "isJOD": job.isJOD
    };
    this.applyingEmployerName = '';
    this.commonService.getSelectedJobByJobId(requestObj).subscribe(success => {
      if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {

        this.isJODForSelectedJob = job.isJOD;
        if (job.isJOD) {
          this.selectedJob = success.jobDetails.jobOfTheDay;
        }
        else {
          this.selectedJob = success.jobDetails;
          this.applyingEmployerName = success.jobDetails.applyingEmployerName;
        }
        setTimeout(() => {
          this.tabSet.select("tFirst");
        }, 200);

      }
      else {
        this.selectedJob = {};
      }
    }, error => {

    });
  }


  GetSelectedJobDetails(job) {
    console.log('details', job);
    var requestObj = {
      "jobId": job.jobId,
      "isJOD": job.isJOD
    };
    this.applyingEmployerName = '';
    this.commonService.getSelectedJobByJobId(requestObj).subscribe(success => {
      console.log('success 1', success);
    })
  }

  onPageChanges(event) {
    this.paginationProps.currentPage = event;
    this.offset = this.paginationProps.itemsPerPage * (event - 1)
    this.getAllJobs(this.offset);
  }

  onPerPageChange(event) {
    this.paginationProps.itemsPerPage = event.currentTarget.value;
    this.paginationProps.currentPage = 1;
    this.offset = 0;
    this.getAllJobs(this.offset);
  }

  onSearchClick() {
    this.paginationProps.currentPage = 1;
    // this.selectedPage = this.perPageItems[0];
    // this.paginationProps.itemsPerPage = this.perPageItems[0];
    this.offset = 0
    this.getAllJobs(this.offset);

  }

  downloadApp() {
    this.modalService.open(DownloadAppComponent)
  }

  applyJob(selectedJobDetails, event) {
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
    this.ApplyScheduleConfirm(selectedJobDetails);
    //   }
    // });

    event.stopPropagation();
  }

  ApplyScheduleConfirm(selectedJobDetails) {
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
          let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
          modalRef.result.then((result) => {
            console.log('Result: ', result);
            if (result == true) {
              this.router.navigate(['/setup-interview']);
            }
            else if (result == false) {
              this.applyJobCall(selectedJobDetails);
            }
          });
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
            setTimeout(() => {
              this.getAllJobs(this.offset);
            }, 1000);
            
            // this.GetSelectedJobDetails(selectedJobDetails);
            var requestObj = {
              "jobId": selectedJobDetails.jobId,
              "isJOD": selectedJobDetails.isJOD
            };
            this.applyingEmployerName = '';
            this.commonService.getSelectedJobByJobId(requestObj).subscribe(success => {
              console.log('success 1', success);
              if (success.jobDetails.isApplied == false) {
                // not applied
                let dataforsending: any = {};
                dataforsending.header = 'Apply Job';
                dataforsending.message = 'Are you sure you want to apply this job?';
                dataforsending.button1 = 'Cancel';
                dataforsending.button2 = 'Apply';
                let modalRef = this.modalService.open(AlertCompComponent, { centered: true });
                modalRef.componentInstance.data = { AlertData: dataforsending };
                modalRef.result.then((h) => {
                  if (h == true) {
                    console.log('Result after login from jobs page: ', h);
                    this.getAllJobs(this.offset);
                    console.log('jobs list : ', this.jobsList);
                    setTimeout(() => {
                      this.jobsList.forEach(job => {
                        if (job.isApplied == true) {
                          if (job.jobId == selectedJobDetails.jobId) {
                            selectedJobDetails.isApplied = true;
                          }
                        }
                      });
                    }, 1000);

                    console.log('Selected job details: ', selectedJobDetails);

                    setTimeout(() => {
                      if (!selectedJobDetails.isApplied) {
                        if (e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.USER_NOT_EXISTS) {

                          console.log('Total Interviews: ', this.dataStorage.totalInterviewsCount);
                          console.log('jobs list : ', this.jobsList);
                          let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
                          modalRef.result.then((result) => {
                            console.log('Result: ', result);
                            if (result == true) {
                              this.router.navigate(['/setup-interview']);
                            }
                            else if (result == false) {
                              console.log('inner else');
                              this.applyJobCall(selectedJobDetails);
                            }
                          });

                        }
                        else if (e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {

                          console.log('Selected job details: ', selectedJobDetails);
                          console.log('jobs list : ', this.jobsList);
                          let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
                          modalRef.result.then((result) => {
                            console.log('Result: ', result);
                            if (result == true) {
                              this.router.navigate(['/setup-interview']);
                            }
                            else if (result == false) {
                              console.log('inner else');
                              this.applyJobCall(selectedJobDetails);
                            }
                          });
                        }
                      }
                      else {
                        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
                      }
                    }, 2000);

                  }
                });
              } else {
                // already applied
                if (success.jobDetails.applyingEmployerName == null) {
                  this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
                } else {
                  this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied by' + success.jobDetails.applyingEmployerName);
                }
                // this.jobsList.forEach(job => {
                //   // if (job.isApplied == true) {
                //   if (job.jobId == selectedJobDetails.jobId) {
                //     // selectedJobDetails.isApplied = true;
                //     job.isApplied = true;
                //   }
                //   // }
                // });
                this.getAllJobs(this.offset);
                console.log('jobs list : ', this.jobsList);
                setTimeout(() => {
                  this.jobsList.forEach(job => {
                    if (job.isApplied == true) {
                      if (job.jobId == selectedJobDetails.jobId) {
                        selectedJobDetails.isApplied = true;
                      }
                    }
                  });
                }, 1000);
              }
            })




          }
        }
      });
    }
  }

  applyJobCall(selectedJobDetails) {
    this.commonService.applyJob({ jobId: selectedJobDetails.jobId }).subscribe(response => {
      if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        selectedJobDetails.isApplied = true;
        this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Apply Job', 'Job applied successfully');
      }
      else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.BAD_REQUEST) {
        this.applyingEmployerName = response.applyingEmployerName;
        selectedJobDetails.isApplied = true;
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', 'Job already applied');
      }
      else if (response.statusCode == MyAppHttpService.RESPONSE_CODES.JOB_APPLY_INACTIVE) {
        this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Apply Job', "Cannot apply to inactive job");
      }
      this.getAllJobs(this.offset);
    }, error => {

    });
  }

  applyForJOD(jodURL) {
    console.log('url : ', jodURL);
    if (jodURL) {
      this.dataStorage.globalJODUrl = jodURL;
      this.modalService.open(JODModalComponent, {
      });
    }

  }

  scrollToDiv() {
    if (window.outerWidth < 768) {
      const element = document.getElementById('job-details') as HTMLInputElement;
      if (!!element)
        element.scrollIntoView({ behavior: 'smooth', block: "end" });
    }
  }

  CopyJob(job, event) {
    console.log('job needs to copy', job, window.location.origin);
    job.ShowMore = false;
    if (job.isJOD == false) {
      let url = window.location.origin + '/job-details?jobId=' + job.jobId;
      console.log('Url', url);
      this._clipboardService.copy(url);
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Copy URL', 'Copied to Clipboard');
    } else if (job.isJOD == true) {
      this._clipboardService.copy(job.jodUrl);
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Copy URL', 'Copied to Clipboard');
    }
    event.stopPropagation();
  }

  ShareJob(job, event) {
    console.log('job needs to share', job);
    job.ShowMore = false;
    event.stopPropagation();
  }

  MoreOptionsClick(job, event) {
    this.CloseAllMoreOptions(job, true);
    console.log('fired more options');
    job.ShowMore = !job.ShowMore;
    event.stopPropagation();
  }

  CloseAllMoreOptions(job, value) {
    if (this.jobsList.length > 0) {
      for (let i = 0; i < this.jobsList.length; i++) {
        if (value == true) {
          if (job.jobId != this.jobsList[i].jobId) {
            this.jobsList[i].ShowMore = false;
          }
        } else {
          this.jobsList[i].ShowMore = false;
        }
      }
    }
  }

  OpenJobDetails(job) {
    this.CloseAllMoreOptions(job, false);
    if (navigator.onLine) {
      var requestObj = {
        "jobId": job.jobId,
        "isJOD": job.isJOD
      };
      // this.applyingEmployerName = '';
      this.commonService.getSelectedJobByJobId(requestObj).subscribe(success => {
        if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
          this.isJODForSelectedJob = job.isJOD;
          console.log('fired 1', job);
          if (job.isNew == true) {
            console.log('fired 2');
            job.isNew = false;
            // this.readJob(job);
          }
          if (job.isJOD) {
            this.selectedJob = success.jobDetails.jobOfTheDay;
            if (this.selectedJob.jobUrl != null) {
              // if (this.dataStorage.totalInterviewsCount == 0) {
              let modalRef = this.modalService.open(ToscheduleInterviewComponent, { centered: true });
              modalRef.result.then((result) => {
                console.log('Result: ', result);
                if (result == true) {
                  if (this.dataStorage.globalIsLoggedInUser) {
                    this.router.navigate(['/setup-interview']);
                  }
                  else {
                    let modal = this.modalService.open(UserLoginComponent, this.dataStorage.globalNgbModalOptions);
                    modal.componentInstance.data = { operation: null };
                    modal.result.then((result) => {
                      console.log('Result: ', result);
                      if ((result.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.USER_NOT_EXISTS) || result.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
                        setTimeout(() => {
                          this.router.navigate(['/setup-interview']);
                        }, 1000);
                      }
                    });
                  }

                }
                else if (result == false) {
                  window.open(this.selectedJob.jobUrl);
                }
              });
              // }
              // else {
              //   window.open(this.selectedJob.jobUrl);
              // }
            }
          }
          else {
            this.selectedJob = success.jobDetails;
            this.applyingEmployerName = success.jobDetails.applyingEmployerName;
            console.log('sending data', success, job.location);
            success.jobDetails.location = job.location;
            let modalRef = this.modalService.open(JobDetailsComponent, { centered: true, size: 'lg', backdrop: 'static' });
            modalRef.componentInstance.data = { JobData: success.jobDetails };
            modalRef.result.then((e) => {
              console.log('result back', e);
              // this.getAllJobs(this.offset);
              if (e == true) {
                job.isApplied = true;
              }
              if(this.dataStorage.UserLoggedIn == true){
                this.getAllJobs(this.offset);
                this.dataStorage.UserLoggedIn = false;
              }
            });
          }
          // setTimeout(() => {
          //   this.tabSet.select("tFirst");
          // }, 200);

        }
        else {
          // this.selectedJob = {};
        }
      }, error => {
        console.log('error', error);
      });
    }
    else {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Offline', 'You are offline now');
    }

  }

  Applied(job, event) {
    event.stopPropagation();
  }

}
