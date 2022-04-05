import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../shared/service/common.service';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoProfilesComponent } from './video-profiles/video-profiles.component';
import { environment } from '../../../environments/environment';
import { ConfirmationPopupComponent } from '../../shared/components/pages/confirmation-popup/confirmation-popup.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyVideosComponent implements OnInit {
  @ViewChild('myVideo') myVideo: ElementRef; // 

  files: any;
  videoProfiles = [];
  thumbnail;


  showVideo = false
  videoUrl = ""
  videoIdx
  chosenVideo: any;
  resumeErrorText: string;
  resumeError: boolean;


  fabDisabled = false


  private fileData: any;
  latest = false;
  Videodetailsfromfirebase: any;
  isDataLoaded;

  data;

  // blobUtil
  constructor(
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService,
    public modalService: NgbModal,
    public commonService: CommonService,
    private router: Router) { }



  ngOnInit(): void {
    this.GettingProfileVideos();
  }

  GettingProfileVideos() {
    this.isDataLoaded = false;
    this.videoProfiles = []

    let apiRequest = null;

    this.commonService.postGetMyVideos(apiRequest).subscribe((apiResponse) => {
      this.isDataLoaded = true;
      console.log('response of myvideos', apiResponse);
      apiResponse.videosDetails.forEach(elt => {
        this.videoProfiles.push(elt)
      });
      if (this.latest) {
        this.showVideo = true
        this.videoUrl = this.videoProfiles[0].videoPath
        this.videoIdx = this.videoProfiles[0].videoId
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getFile(event) {
    if (this.videoProfiles.length == 3) {

      // this.resumeErrorText='Maximum 3 videos only allowed';
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'my-videos', 'Maximum 3 videos only allowed.')
      this.fabDisabled = true;
      return
    }
    this.stopVid();
    this.files = event.target.files || event.srcElement.files;

    let name = '';
    let fileExt = '';
    let size = 0;
    if (!!this.files) {
      console.log(this.files[0]);
      name = this.files[0].name;
      fileExt = name.split('.').pop();
      size = this.files[0].size;
    }
    console.log('Files : ', this.files);
    if (this.files == undefined) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'my-videos', 'File not selected.')
    } else if (this.files.length == 0) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'my-videos', 'File not selected.')
    } else if (size == 0) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'my-videos', 'Please select another file.')
    } else if (size > 157286400) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'my-videos', 'Please select file less than 150 MB.')
    } else if (!this.CheckValidVideoFormats(fileExt)) {
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'my-videos', 'Please select valid video file.')
    } else {
      this.videoprofile();
      // this.getVideoCover(this.files,1.5);

    }

  };

  uploadedImage;
  uploadedVideo;
  getImageFile(event) {

  }

  getVideoFile(event) {

  }
  videoprofile() {
    let modalRef = this.modalService.open(VideoProfilesComponent);
    modalRef.componentInstance.data = { filename: name };
    modalRef.result.then((e) => {
      if (e != null && e != undefined)
        console.log('file info : ', e);
      var videoTitle = e;
      console.log(videoTitle);
      try {
        // get the frame at 1.5 seconds of the video file
        const cover = this.getVideoCover(this.files, 1.5);
        console.log('Cover image', cover);
        // this.thumbnail = cover;
        // var newblob = new Blob([this.thumbnail], {type: 'image/jpg'});
        // // print out the result image blob
        // console.log('cover :', newblob);
        // this.thumbnail = newblob;

        // // this.uploadFile(videoTitle, cover, videoTitle + '.' + this.files[0].type.split('/')[1], cover, videoTitle + '.jpg');

        // // this.uploadProfileVideo(e, this.files[0]);
        // this.uploadAttachment(videoTitle);
      } catch (ex) {
        console.log("ERROR: ", ex);
      }
    });

  }

  uploadProfileVideo(videoTitle, videoPath) {
    console.log('video title, video path', videoTitle, videoPath);
    // if(this.networkService.isOffline()) {
    // this.networkService.showToast()
    // return
    // }
    // this.showLoading()
    this.getFileBlob(videoPath.localURL, videoPath.type).then(mBlob => {
      return mBlob;
    }).then(mBlob => {
      console.log('mblob', mBlob);
      // this.videoeditor.createThumbnail(option).then(result => {
      //   this.getFileBlob('file:///' + result, 'image/jpg').then(fBlob => {
      // debugger
      console.log('blob data', videoTitle, this.files[0], videoTitle + '.' + videoPath.type.split('/')[1], this.thumbnail, videoTitle + '.jpg');
      this.uploadFile(videoTitle, this.files[0], videoTitle + '.' + videoPath.type.split('/')[1], this.thumbnail, videoTitle + '.jpg')
      //   }).catch(e => {
      //     console.log('blob error', e);
      //   })
      // }).catch(e => {
      //   console.log('myreserr', e);
      // });
    }).catch(e => {
      console.log('myreserr2', e);
    })
  }

  async getFileBlob(fullPath, type) {
    // return new Promise((resolve, reject) => {
    //   this.file.
    //   .resolveLocalFilesystemUrl(fullPath)
    //     .then(fileEntry => {
    //       let { name, nativeURL } = fileEntry;
    //       let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
    //       return this.file.readAsArrayBuffer(path, name);
    //     })
    //     .then(buffer => {
    //       let medBlob = new Blob([buffer], {
    //         type: type
    //       });
    //       resolve(medBlob)
    //     })
    //     .catch(e => {
    //       console.log(e)
    //       reject(e)
    //     });
    // })
    let file = this.files[0];
    // let reader = new FileReader();
    // reader.onload = function(e) {
    // let blob = new Blob([new Uint8Array(e.target.result)], {type: file.type });

    // console.log(blob);
    // reader.readAsArrayBuffer(file);

    //   var fileReader = new FileReader();
    //   let blobUtil;
    // fileReader.onloadend = function (e) {
    //   var arrayBuffer = e.target.result;
    //   var fileType = file.type;

    //   blobUtil.arrayBufferToBlob(arrayBuffer, fileType).then(function (blob) {
    //     console.log('here is a blob', blob);
    //     console.log('its size is', blob.size);
    //     console.log('its type is', blob.type);
    //   }).catch(console.log.bind(console));
    // };
    // fileReader.readAsArrayBuffer(file);
    // return blobUtil;
    // };

    this.changeFile(file).then((base64: string): any => {
      console.log('base64', base64);
      //let fileBlob = new Blob([base64], type);
      //console.log(fileBlob)

      return base64;
    });

  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  CheckValidVideoFormats(fileExt: string) {
    let VideoFormats: any[] = ['3g2', '3gp', 'avi', 'flv', 'h264', 'm4v', 'mkv', 'mov', 'mp4', 'mpg', 'mpeg', 'rm', 'swf', 'vob', 'wmv'];
    let index: number = VideoFormats.findIndex((format: string) => {
      return format === fileExt.toLowerCase();
    });
    return index !== -1;
  }



  getVideoCover(file, seekTo = 0.0) {
    console.log("getting video cover for file: ", file);
    return new Promise((resolve, reject) => {
      // load the file to a video player
      const videoPlayer = document.createElement('video');
      videoPlayer.setAttribute('src', URL.createObjectURL(file[0]));
      videoPlayer.load();
      videoPlayer.addEventListener('error', (ex) => {
        reject(ex);
      });
      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener('loadedmetadata', () => {
        // seek to user defined timestamp (in seconds) if possible
        if (videoPlayer.duration < seekTo) {
          reject("video is too short.");
          return;
        }
        // delay seeking or else 'seeked' event won't fire on Safari
        setTimeout(() => {
          videoPlayer.currentTime = seekTo;
        }, 200);
        // extract video thumbnail once seeking is complete
        videoPlayer.addEventListener('seeked', () => {
          console.log('video is now paused at %ss.', seekTo);
          // define a canvas to have the same dimension as the video
          const canvas = document.createElement("canvas");
          canvas.width = videoPlayer.videoWidth;
          canvas.height = videoPlayer.videoHeight;
          // draw the video frame to canvas
          const ctx = canvas.getContext("2d");
          ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
          // return the canvas image as a blob
          ctx.canvas.toBlob(
            blob => {
              resolve(blob);
              console.log(blob);
            },
            "mp4",
            0.75 /* quality */
          );
        });
      });
    });
  }

  uploadFile(fileName, file, fname, thumbnailFile, thumbnailName) {
    console.log('file upload data', fileName, file, fname, thumbnailFile, thumbnailName);
    this.fileData = new FormData()
    let name = fname == null ? file.name : fname
    console.log('name : ', name)
    this.fileData.append("videoFile", this.files[0], name)
    this.fileData.append("videoTitle", fileName)
    this.fileData.append("thumbnailFile", thumbnailFile, thumbnailName)
    var xhr = new XMLHttpRequest()
    let url = "multimedia/uploadProfileVideo"
    var apiURL = environment.apiUrl + 'api/v2/' + url;
    var token = localStorage.getItem('token');
    console.log('token', token);
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },

    xhr.open('POST', apiURL, true)
    xhr.setRequestHeader("token", token);
    xhr.onload = () => {
      try {
        // this.hideLoading()
      } catch (e) { }
      if (xhr.status == 200) {
        this.fabDisabled = false;
        this.GettingProfileVideos();
      }
    }
    xhr.send(this.fileData);
  }


  stopVid() {
    console.log('finish', event)
    this.videoIdx = -1
    this.showVideo = false
  }

  playStopVideo(videoProfile, idx) {
    if (idx != this.videoIdx) {
      this.videoIdx = -1
      this.showVideo = false
      this.videoUrl = videoProfile.videoPath
    }
    if (!this.showVideo) {
      this.showVideo = true
      this.videoUrl = videoProfile.videoPath
      this.videoIdx = idx
    } else {
      this.showVideo = false
      this.videoUrl = videoProfile.videoPath
      this.videoIdx = -1
    }
  }

  downloadVideo(videoProfile) {

    var fileExt = videoProfile.videoPath.substr(videoProfile.videoPath.lastIndexOf('/') + 1).split('.')[1]

  }


  deleteVideo(videoProfile) {

    let confirmModalRef = this.modalService.open(ConfirmationPopupComponent, { windowClass: 'confirmation-dialog', centered: true });
    confirmModalRef.componentInstance.data = { contentText: 'Are you sure you want to delete your recording ?', title: 'Delete Video' }

    confirmModalRef.result.then((value) => {
      console.log('value : ', value);
      if (value == true) {
        let requestData = {
          videoId: videoProfile.videoId
        };
        this.commonService.PostDeleteMyVideo(requestData).subscribe(response => {
          console.log('After Deleting', response);
          if (this.videoIdx == videoProfile.videoId) {
            this.showVideo = false;
          }
          this.GettingProfileVideos();
        }, error => {
          console.log("---------------------------------------------------1");
          console.log(error);
          console.log("---------------------------------------------------2");
          // alert("Error");
        }, () => {
        });

      }
    });

  }

  onVideoClick(event) {

    // if( this.myVideo.nativeElement.paused){
    //   this.myVideo.nativeElement.play();
    // }
    // else{
    //   this.myVideo.nativeElement.pause();
    // }
    if (event.target.paused) {
      event.target.play();
    }
    else {
      event.target.pause();
    }
    event.preventDefault();
  }


  uploadAttachment(videoTitle) {
    let fileData = new FormData();
    let fileName: string = '';
    console.log('Attachment : ', this.files);

    if (this.files.length > 0) {
      var reader = new FileReader();
      // reader.addEventListener('load', readFile);
      reader.readAsText(this.files[0]);
      console.log('after convert', reader);
      var blob = new Blob([reader.result], { type: this.files[0].type });
      fileName = this.files[0].name;
      console.log('File name : ', fileName);
      // let newname = 'mynewvideo';
      let thumbnailName = 'mynewvideo.jpg';
      var newblob = new Blob([this.thumbnail], {type: 'image/jpg'});
      // fileData.append('attachment', this.files[0], fileName);
      fileData.append("videoFile", blob, fileName)
      fileData.append("videoTitle", videoTitle)
      fileData.append("thumbnailFile", newblob, thumbnailName)
      console.log('appended data', fileData);
      var xhr = new XMLHttpRequest()
      let url = "multimedia/uploadProfileVideo"
      var apiURL = environment.apiUrl + 'api/v2/' + url;
      var token = localStorage.getItem('token');
      console.log('token', token);
  
      xhr.open('POST', apiURL, true)
      xhr.setRequestHeader("token", token);
      xhr.onload = () => {
        try {
          // this.hideLoading()
        } catch (e) { }
        if (xhr.status == 200) {
          // this.fabDisabled = false;
          this.GettingProfileVideos();
        }
      }
      xhr.send(fileData);
    }

  }


}
