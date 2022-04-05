import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
    selector: 'app-team-header',
    templateUrl: './team-header.component.html',
    styleUrls: ['./team-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TeamHeaderComponent implements OnInit {
    constructor(public dataStorage: DataStorageService) {
    }

    ngOnInit() {
    }
}
