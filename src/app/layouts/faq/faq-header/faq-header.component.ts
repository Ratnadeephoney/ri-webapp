import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
    selector: 'app-faq-header',
    templateUrl: './faq-header.component.html',
    styleUrls: ['./faq-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FaqHeaderComponent implements OnInit {
    constructor(public dataStorage: DataStorageService) {
    }

    ngOnInit() {
    }
}
