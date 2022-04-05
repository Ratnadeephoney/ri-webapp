import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { CommonService } from '../../shared/service/common.service';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { Location } from '@angular/common';
import { RegisteredTrainingUsersComponent } from '../../shared/components/pages/registered-training-users/registered-training-users.component';
import { environment } from '../../../environments/environment';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertCompComponent } from '../alert-comp/alert-comp.component';
import { response } from 'express';

declare var Razorpay: any;
// declare var require: any
// const FileSaver = require('file-saver');


@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTrainingComponent implements OnInit {
  activeTab = 1;
  Tab1active: boolean = true;
  Tab2active: boolean = false;
  Tab3active: boolean = false;
  Tab1formchanges: boolean = false;
  AddTopicButton: boolean = false;
  EnableTopicAdd: boolean = false;
  Attachmentfield = new FormControl();
  attachments: any = [];
  skillfocused: boolean = false;
  addTrainingForm: FormGroup;
  submitted: boolean;
  isTopicSubmitted: boolean;
  topicId = 0;

  uploadType = { IMAGE: 'image', ATTACHMENT: 'attachment', VIDEO: 'video' }

  addTopicForm: FormGroup;
  courseImageInfo = { fileName: '', uploadedImage: '' };
  resume = '';

  courseId = null;
  isEditCourseClicked = false;
  selectedTopicInfo;


  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private location: Location,
    private cdr: ChangeDetectorRef, private http: HttpClient,
    private router: Router) {
    if (this.dataStorage.EditTraining == true) {
      this.route.queryParams.subscribe(params => {
        console.log('params: ', params)
        if (!!params.trainingId) {
          this.courseId = params.trainingId;
          this.getCourseDetails();
        }
      });
    }
  }

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');

    this.addTrainingForm = new FormBuilder().group({
      trainingTitle: ['', Validators.compose([Validators.required])],
      technologies: ['', Validators.compose([Validators.required])],
      trainingDescription: ['', Validators.compose([Validators.required])],
      trainingImage: [],
      trainingAttachments: [],
      trainingVideo: [],
      courseId: [null]
    });
    this.addTrainingForm.valueChanges.subscribe((valuechanged) => {
      console.log('value changed', valuechanged);
      this.Tab1formchanges = true;
      if (this.addTrainingForm.value.trainingTitle != null) {
        this.addTrainingForm.value.trainingTitle = this.addTrainingForm.value.trainingTitle.trim();
      }
      if (this.addTrainingForm.value.trainingDescription != null) {
        this.addTrainingForm.value.trainingDescription = this.addTrainingForm.value.trainingDescription.trim();
      }
      if (this.addTrainingForm.value.trainingTitle == "") {
        this.addTrainingForm.controls['trainingTitle'].reset();
      }
      if (this.addTrainingForm.value.trainingDescription == "") {
        this.addTrainingForm.controls['trainingDescription'].reset();
      }
    });

    this.addTopicForm = new FormBuilder().group({
      topicName: ['', Validators.compose([Validators.required])],
      topicDescription: [''],
      topicDuration: ['', Validators.compose([Validators.required, Validators.min(1)])],
      topicPrice: ['', Validators.compose([Validators.required, Validators.min(1)])],
    });


    if (this.courseId) {
      this.getAllTopic();
      this.getAttachmentsByCourseId();
    }

  }

  getCourseDetails() {
    this.commonService.getCourseDetails({ courseId: this.courseId }).subscribe(response => {
      if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        console.log('response of data', response);
        // let selectedTechs = [];
        // if(response.techIds.length != 0) {
        //   response.techIds.forEach(t => {
        //     this.dataStorage.globalSkillsList.forEach(element => {
        //       if(t == element.technologyId) {
        //         selectedTechs.push(element);
        //       }
        //     });  
        //   });

        // }
        this.addTrainingForm.patchValue(
          {
            trainingTitle: response.courseName
            , trainingDescription: response.trainingDescription
            , technologies: response.techIds.map(String)
          }

        );
        setTimeout(() => {
          this.Tab1formchanges = false;
        }, 200);
      }
    }, error => {

    });
  }

  NextFromPage1() {
    console.log('data of form1', this.addTrainingForm.value);
    if (this.addTrainingForm.invalid) {
      this.submitted = true;
      return false;
    }
    if (this.courseId == null) {
      var requestObj = {
        courseName: this.addTrainingForm.value.trainingTitle,
        techIds: this.addTrainingForm.value.technologies,
        trainingDescription: this.addTrainingForm.value.trainingDescription,
        trainingImageUrl: null
      };

      this.commonService.createTraining(requestObj).subscribe((response) => {
        this.courseId = response.courseId;
        this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Create Training', 'Training created successfully');
        this.Tab1active = false;
        this.Tab2active = true;
        this.Tab3active = false;
        this.Tab1formchanges = false;
        this.activeTab = 2;
      }, (error) => {

      });
    } else {
      if (this.Tab1formchanges == true) {
        let requestObj = {
          courseId: this.courseId,
          courseName: this.addTrainingForm.value.trainingTitle,
          techIds: this.addTrainingForm.value.technologies,
          trainingDescription: this.addTrainingForm.value.trainingDescription
        }
        this.commonService.editTraining(requestObj).subscribe((response) => {
          // this.courseId = response.courseId;
          this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Update Training', 'Training updated successfully');
          this.Tab1active = false;
          this.Tab2active = true;
          this.Tab3active = false;
          this.Tab1formchanges = false;
          this.activeTab = 2;
        }, (error) => {

        });
      } else {
        this.Tab1active = false;
        this.Tab2active = true;
        this.Tab3active = false;
        this.Tab1formchanges = false;
        this.activeTab = 2;
      }
    }
  }

  AddTopicNew() {
    this.EnableTopicAdd = true;
  }

  NextFromPage2() {
    if (this.topicList.length < 1) {
      let dataforsending: any = {};
      dataforsending.header = 'Alert';
      dataforsending.message = 'Please Add Atleast one Topic';
      dataforsending.button1 = null;
      dataforsending.button2 = 'Ok';
      let modalRef = this.modalService.open(AlertCompComponent);
      modalRef.componentInstance.data = { AlertData: dataforsending };
      modalRef.result.then((e) => {
        if (e == true) {
          console.log('Fired after ok');
          this.AddTopicNew();
          setTimeout(() => {
            document.getElementById('topicTitle').focus();
          }, 500);
        } else {
          // this.Tab1active = false;
          // this.Tab2active = false;
          // this.Tab3active = true;
          // this.activeTab = 4;
          //this.AddTopicNew();
        }
      });
    } else {
      this.Tab1active = false;
      this.Tab2active = false;
      this.Tab3active = true;
      this.activeTab = 4;
    }
  }

  Cancel() {
    if (this.dataStorage.FromMentor == false) {
      this.router.navigate([MyAppHttpService.PathInformation.TRAININGS.PATH]);
    } else {
      this.router.navigate([MyAppHttpService.PathInformation.BECOME_A_MENTOR.PATH]);
    }
  }

  BackToList() {
    this.router.navigate([MyAppHttpService.PathInformation.TRAININGS.PATH]);
  }

  Previousfrompage2() {
    this.Tab1active = true;
    this.Tab2active = false;
    this.Tab3active = false;
    this.activeTab = 1;
  }

  PreviousfromPage3() {
    this.Tab1active = false;
    this.Tab2active = true;
    this.Tab3active = false;
    this.activeTab = 2;
  }

  OpenAttachment(data) {
    if (data.multimediaPath != null) {
      this.downloadFile(data.multimediaPath, data.multimediaPath.substr(data.multimediaPath.lastIndexOf('/') + 1))
    }
  }

  downloadFile(url, fileName){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", ''+url+'', true);
    xhr.responseType = "blob";
    xhr.onload = function(){
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

  DeleteAttachment(att) {
    let dataforsending: any = {};
    dataforsending.header = 'Confirm';
    dataforsending.message = 'Do you really want to delete?';
    dataforsending.button1 = 'Cancel';
    dataforsending.button2 = 'Confirm';
    let modalRef = this.modalService.open(AlertCompComponent);
    modalRef.componentInstance.data = { AlertData: dataforsending };
    modalRef.result.then((e) => {
      if (e == true) {
        console.log('Fired after Confirm');
        this.DeleteAttachmentNew(att);
      }
    });
  }

  DeleteAttachmentNew(att) {
    this.commonService.deleteAttachmentByAttachmentId({ attachmentId: att.id }).subscribe(response => {
      // if(response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {

      // }
      if (response.statusCode) {
        this.attachments = this.attachments.filter(x => x.id != att.id);
        // this.toastCtrl.presentToast('Attachment removed successfully');
        this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Delete Attachment', 'Attachment Deleted Successfully');
      }

    }, error => {

    });
  }

  getAllTopic() {
    var requestObj = { courseId: this.courseId };

    this.commonService.getAllTopics(requestObj).subscribe(response => {
      this.topicList = response.topicsList;
      if (this.topicList.length > 0) {
        this.EnableTopicAdd = true;
      }
    }, error => {

    });
  }

  getAttachmentsByCourseId() {
    this.commonService.getAttachmentsByCourseId({ courseId: this.courseId }).subscribe(response => {
      console.log('response of attachments', response);
      if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.attachments = response.attachments;
      }
    }, error => {

    });
  }

  createCourse() {
    if (this.addTrainingForm.invalid) {
      this.submitted = true;
      return false;
    }

    var requestObj = {
      courseName: this.addTrainingForm.value.trainingTitle,
      techIds: this.addTrainingForm.value.technologies,
      trainingDescription: this.addTrainingForm.value.trainingDescription,
      trainingImageUrl: this.courseImageInfo.uploadedImage
    };

    this.commonService.createTraining(requestObj).subscribe((response) => {
      this.courseId = response.courseId;
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Create Training', 'Training created successfully');
    }, (error) => {

    });
  }

  topicList = [];
  addTopic() {
    if (this.addTopicForm.invalid) {
      this.isTopicSubmitted = true;
      return false;
    }

    var requestObj = {
      courseId: this.courseId,
      topicName: this.addTopicForm.value.topicName,
      topicDescription: this.addTopicForm.value.topicDescription,
      duration: this.addTopicForm.value.topicDuration,
      price: this.addTopicForm.value.topicPrice
    };

    this.commonService.addTopic(requestObj).subscribe((response) => {
      this.topicList.push(response);
      this.topicList.sort((a, b) => { return b.topicId - a.topicId });
      this.addTopicForm.reset();
      this.isTopicSubmitted = false;
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Add Topic', 'Topic added successfully')
    }, (error) => {

    });


  }

  updateTopic() {
    if (this.addTopicForm.invalid) {
      this.isTopicSubmitted = true;
      return false;
    };

    var requestObj = {
      courseId: this.courseId,
      topicName: this.addTopicForm.value.topicName,
      topicDescription: this.addTopicForm.value.topicDescription,
      duration: this.addTopicForm.value.topicDuration,
      price: this.addTopicForm.value.topicPrice,
      topicId: this.selectedTopicInfo.topicId
    };

    this.commonService.updateTopic(requestObj).subscribe((response) => {
      this.topicList = this.topicList.filter(x => x.topicId != this.selectedTopicInfo.topicId);
      this.topicList.push(response);
      this.topicList.sort((a, b) => { return b.topicId - a.topicId });
      this.addTopicForm.reset();
      this.selectedTopicInfo = null;
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Update Topic', 'Topic updated successfully')
    }, (error) => {

    });

  }

  cancelTopic() {
    this.selectedTopicInfo = null;
    this.addTopicForm.reset();
  }

  deleteTopic(topic) {
    let dataforsending: any = {};
    dataforsending.header = 'Confirm';
    dataforsending.message = 'Do you really want to delete?';
    dataforsending.button1 = 'Cancel';
    dataforsending.button2 = 'Confirm';
    let modalRef = this.modalService.open(AlertCompComponent);
    modalRef.componentInstance.data = { AlertData: dataforsending };
    modalRef.result.then((e) => {
      if (e == true) {
        console.log('Fired after Confirm');
        this.DeleteTopicNew(topic);
      }
    });
  }

  DeleteTopicNew(topic) {
    var requestObj = {
      courseId: this.courseId,
      topicId: topic.topicId
    };

    this.commonService.deleteTopic(requestObj).subscribe((response) => {
      this.topicList = this.topicList.filter(x => x.topicId != topic.topicId);
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Delete Topic', 'Topic deleted successfully');
      this.addTopicForm.reset();
    }, (error) => {

    });
  }

  update() {

  }

  editTopic(topic) {
    console.log('edit topic', topic);
    this.EnableTopicAdd = true;
    this.selectedTopicInfo = topic;
    this.addTopicForm.patchValue(
      {
        'topicName': topic.topicName,
        'topicDescription': topic.topicDescription,
        'topicDuration': topic.duration,
        'topicPrice': topic.price
      }
    );
    document.getElementById('topicTitle').focus();
  }

  files = [];
  //   resumeError;
  //   resumeErrorText;

  // getFile1(event, type) {
  //   this.files = event.target.files || event.srcElement.files;

  //   var byte = 1048576;
  //   let name = '';
  //   let fileExt = '';
  //   let size = 0;
  //   if (!!this.files) {
  //     name = this.files[0].name;
  //     fileExt = name.split('.').pop();
  //     size = this.files[0].size;
  //   }
  //   console.log('Files : ', this.files);

  //   var fileLength = (type == this.uploadType.IMAGE ? 2 * byte :
  //     (this.uploadType.VIDEO || this.uploadType.ATTACHMENT) ? 50 * byte : 0);
  //   var fileFormats = (type == this.uploadType.IMAGE ? ['jpg', 'jpeg', 'png'] :
  //     this.uploadType.VIDEO ? ['mp4', 'flv', 'm4v', 'amv', '3gp'] :
  //       []);

  //   if (this.files === undefined) {

  //   } else if (this.files.length == 0) {

  //   } else if (size == 0) {

  //   }
  //   else if (size > fileLength) {
  //     this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', `Please select file less than ${fileLength} MB`)
  //   } else if (!(type == this.uploadType.ATTACHMENT || fileFormats.indexOf(fileExt.toLocaleLowerCase()) > -1)) {
  //     this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', `Please select proper file`)
  //   }
  //   else {
  //     this.uploadFile(type);
  //   }
  // }

  // uploadFile(type) {

  //   let fileData = new FormData();
  //   let fileName: string = '';

  //   if (this.files.length > 0) {
  //     this.courseImageInfo.fileName = fileName = this.files[0].name;
  //     console.log('File name : ', fileName);

  //     if (this.uploadType.IMAGE == type) {
  //       fileData.append('image', this.files[0], fileName);
  //     }
  //     else if (this.uploadType.ATTACHMENT == type) {
  //       fileData.append('attachment', this.files[0], fileName);
  //     }
  //   }

  //   let xhr = new XMLHttpRequest();
  //   // let resUrl = 'http://52.66.192.63:8080/rockinterviewadmin/UploadResumeServlet';
  //   let apiUrl = environment.apiUrl +
  //     (type == this.uploadType.IMAGE ? MyAppHttpService.REQUESTS.uploadTrainingImage :
  //       type == this.uploadType.ATTACHMENT ? MyAppHttpService.REQUESTS.uploadTrainingAttachment : '');
  //   // console.log("URL : ",resUrl,apiUrl);
  //   xhr.open('POST', apiUrl, true);
  //   xhr.setRequestHeader('token', localStorage.getItem('token'));
  //   xhr.setRequestHeader('courseId', this.courseId.toString());
  //   xhr.onload = () => {
  //     if (xhr.status == 200) {
  //       debugger;
  //       if (JSON.parse(xhr.response).statusCode == 200) {
  //         this.courseImageInfo.uploadedImage = JSON.parse(xhr.response).uploadedImageUrl;
  //       }
  //     }
  //   }

  //   xhr.send(fileData);
  // }


  getFile(event) {
    this.files = event.target.files
    this.files = event.target.files || event.srcElement.files;
    console.log('File list length : ', this.files.length);
    console.log('Resume : ', this.files);

    let name = '';
    let fileExt = '';
    let size = 0;
    if (!!this.files) {
      name = this.files[0].name;
      fileExt = name.split('.').pop();
      size = this.files[0].size;
    }

    console.log('Files, names : ', this.files);
    if (this.files === undefined) {

      // return;
    } else if (this.files.length == 0) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', 'File not selected.');

    } else if (size == 0) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', 'File not supported, Please select another file.');

    } else if (size > 1048576 * 150) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', 'Please select file less than 150 MB.');

    } else {
      // this.uploadResume(chatType);
      this.uploadAttachment();
      // return;
    }
  };

  uploadAttachment() {
    let fileData = new FormData();
    let fileName: string = '';
    console.log('Attachment : ', this.files);

    if (this.files.length > 0) {
      fileName = this.files[0].name;
      console.log('File name : ', fileName);
      fileData.append('attachment', this.files[0], fileName);
    }

    let xhr = new XMLHttpRequest();
    let apiUrl = environment.apiUrl + MyAppHttpService.REQUESTS.uploadTrainingAttachment;
    // console.log("URL : ",resUrl,apiUrl);
    xhr.open('POST', apiUrl, true);
    //xhr.setRequestHeader('content-type', 'multipart/form-data');
    xhr.setRequestHeader('token', localStorage.getItem('token'));
    xhr.setRequestHeader('courseId', this.courseId.toString());
    // this.commonService.showLoader();
    xhr.onload = () => {
      if (xhr.status == 200) {
        // this.commonService.hideLoader();
        console.log('server response:   ' + xhr.response);
        let response = JSON.parse(xhr.response);
        if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
          this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Upload File', 'Attachment added successfully');
          this.attachments.push(response);
        }
        else if (response.message == 'COURSE_EXCEEDED_ATTACHMENTS') {
          this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Upload File', "You can't upload more than 3 attachments");
        }
      }
    }
    xhr.send(fileData);
  }

  backToList() {

  }

  showRegisteredUsers(trainingInfo) {
    console.log('training info : ', trainingInfo)
    let modalRef = this.modalService.open(RegisteredTrainingUsersComponent);
    modalRef.componentInstance.data = { trainingInfo: trainingInfo };
  }

  addNewCourse() {
    console.log('New Training form : ', this.addTrainingForm.value);
    if (this.addTrainingForm.invalid) {
      this.submitted = true;
    }
    else {
      this.submitted = false;
    }
  }

  ngOnDestroy() {
    this.dataStorage.EditTraining = false;
  }

}
