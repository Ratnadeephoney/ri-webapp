import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
    selector: 'app-contact-us-header',
    templateUrl: './contact-us-header.component.html',
    styleUrls: ['./contact-us-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactUsHeaderComponent implements OnInit {
    constructor(public dataStorage: DataStorageService) {
    }

    ngOnInit() {
    }
}
