import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
    selector: 'app-team-about',
    templateUrl: './team-about.component.html',
    styleUrls: ['./team-about.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TeamAboutComponent implements OnInit {
    constructor(public dataStorage: DataStorageService) {
    }

    ngOnInit() {
    }
}
