import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';


@Component({
    selector: 'app-jobseeker-learn-more',
    templateUrl: './jobseeker-learn-more.component.html',
    styleUrls: ['./jobseeker-learn-more.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JobseekerLearnMoreComponent implements OnInit {
    constructor(public dataStorage: DataStorageService) {
    }

    ngOnInit() {
    }



}
