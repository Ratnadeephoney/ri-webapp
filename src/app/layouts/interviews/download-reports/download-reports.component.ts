import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/service/common.service';


@Component({
    selector: 'app-download-reports',
    templateUrl: './download-reports.component.html',
    styleUrls: ['./download-reports.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DownloadReportsComponent implements OnInit {

    public url: any;
    submitted: boolean;

    constructor(private router: Router, public activeModal: NgbActiveModal, private fb: FormBuilder,
        private commonService: CommonService) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.url = event.url;
            }
        });
    }

    ngOnInit() {

    }

    onModalDismiss() {
        this.activeModal.close()
    }

}
