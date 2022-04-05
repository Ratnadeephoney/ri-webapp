import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DownloadAppComponent } from 'src/app/shared/components/pages/download-app/download-app.component';


@Component({
    selector: 'app-jobseeker-banner',
    templateUrl: './jobseeker-banner.component.html',
    styleUrls: ['./jobseeker-banner.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JobseekerBannerComponent implements OnInit {
    jobseekerbannerOptions = {
        items: 1,
        nav: true,
        navClass: ['owl-prev', 'owl-next'],
        navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
        dots: false,
        autoplay: false,
        slideSpeed: 300,
        loop: true,
        autoplayHoverPause: true,
    }
    constructor(public dataStorage: DataStorageService, private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    downloadApp() {
        console.log('download')
        this.modalService.open(DownloadAppComponent)
    }
}
