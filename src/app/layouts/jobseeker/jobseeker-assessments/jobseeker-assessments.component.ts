import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DownloadAppComponent } from 'src/app/shared/components/pages/download-app/download-app.component';
import { FeedbackPopupComponent } from 'src/app/shared/components/pages/feedback-popup/feedback-popup.component';


@Component({
    selector: 'app-jobseeker-assessments',
    templateUrl: './jobseeker-assessments.component.html',
    styleUrls: ['./jobseeker-assessments.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JobseekerAssessmentsComponent implements OnInit {
    constructor(public dataStorage: DataStorageService, private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    downloadApp() {
        console.log('download')
        this.modalService.open(DownloadAppComponent,{});
    }

    showFeedback(){
        this.modalService.open(FeedbackPopupComponent)
    }

}
