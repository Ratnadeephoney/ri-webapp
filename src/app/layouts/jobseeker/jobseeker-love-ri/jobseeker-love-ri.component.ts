import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';


@Component({
    selector: 'app-jobseeker-love-ri',
    templateUrl: './jobseeker-love-ri.component.html',
    styleUrls: ['./jobseeker-love-ri.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JobseekerLoveRiComponent implements OnInit {
    constructor(public dataStorage: DataStorageService) {
    }

    ngOnInit() {
    }


}
