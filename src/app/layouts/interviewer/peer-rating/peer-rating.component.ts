import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DownloadAppComponent } from 'src/app/shared/components/pages/download-app/download-app.component';


@Component({
    selector: 'app-peer-rating',
    templateUrl: './peer-rating.component.html',
    styleUrls: ['./peer-rating.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PeerRatingComponent implements OnInit {
    constructor(public dataStorage: DataStorageService, private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    downloadApp() {
        console.log('download')
        this.modalService.open(DownloadAppComponent,{});
    }

}
