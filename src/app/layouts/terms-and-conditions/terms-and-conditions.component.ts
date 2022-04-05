import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { ColorScssService } from 'src/app/shared/service/color-scss.service';


@Component({
    selector: 'app-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: ['./terms-and-conditions.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TermsAndConditionsComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private title: Title,
        public colorPicker: ColorScssService,
        public dataStorage: DataStorageService) {
         }
    
      ngOnInit() {
        this.title.setTitle(this.route.snapshot.data['title']);
        this.colorPicker.setColorScheme('color-2');
      }
}
