import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
    selector: 'app-careers-header',
    templateUrl: './careers-header.component.html',
    styleUrls: ['./careers-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CareersHeaderComponent implements OnInit {
    constructor(public dataStorage: DataStorageService) {
    }

    ngOnInit() {
    }
}
