import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DownloadAppComponent } from '../../../shared/components/pages/download-app/download-app.component';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
    selector: 'app-become-mentor',
    templateUrl: './become-mentor.component.html',
    styleUrls: ['./become-mentor.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BecomeMentorComponent implements OnInit {
    constructor(public dataStorage: DataStorageService, private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    downloadApp() {
        console.log('download')
        this.modalService.open(DownloadAppComponent)
    }

}
