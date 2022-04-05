import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyAppHttpService } from '../../../shared/service/my-app-http.service';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { CommonService } from '../../../shared/service/common.service';
import { MyVideosComponent } from '../my-videos.component';

@Component({
  selector: 'app-video-profiles',
  templateUrl: './video-profiles.component.html',
  styleUrls: ['./video-profiles.component.scss']
})
export class VideoProfilesComponent implements OnInit {

  files: any;
  videoPath: any;
  data: any;
  videoForm: FormGroup;
  formValue:any;
  

  constructor( public activeModal: NgbActiveModal,public fb: FormBuilder, public commonService: CommonService,public modalService: NgbModal) {

    this.videoForm = this.fb.group({
      filename: [!!this.data ? this.data.fileName : '', Validators.compose([Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.NAME)])],
    
    });
   }

  ngOnInit(): void {
  }
  

  onModalDismiss(value) {
  //   this.formValue = this.videoForm.value;
  // let datasending = this.formValue

  // if(datasending.filename=="" && datasending.filename==undefined)
  // {
  //   this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'video-profiles', 'file name can not be blank.')
  // }

    this.activeModal.close(value);
}


save()
{
  this.formValue = this.videoForm.value;
  let datasending = this.formValue

  let name=datasending.filename;
  console.log('file name :',name);

  if(datasending.filename=="" )
  {
    this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'video-profiles', 'File name can not be blank.')
  }
  // this.videoprofile();
  this.activeModal.close(name);
}





}
