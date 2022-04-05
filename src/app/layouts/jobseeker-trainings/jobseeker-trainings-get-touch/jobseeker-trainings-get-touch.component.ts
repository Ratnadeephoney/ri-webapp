import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';


@Component({
    selector: 'app-jobseeker-trainings-get-touch',
    templateUrl: './jobseeker-trainings-get-touch.component.html',
    styleUrls: ['./jobseeker-trainings-get-touch.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JobseekerTrainingsGetTouchComponent implements OnInit {
    constructor(public dataStorage: DataStorageService) {
    }

    ngOnInit() {
    }



}
