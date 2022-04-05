import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
    selector: 'app-careers-open-positions',
    templateUrl: './careers-open-positions.component.html',
    styleUrls: ['./careers-open-positions.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CareersOpenPositionsComponent implements OnInit {
    constructor(public dataStorage: DataStorageService, private router: Router) {
    }

    ngOnInit() {
        //this.dataStorage.showOpportunities = false;
    }

    goToCareerOpps(category, opportunity) {
        //this.dataStorage.showOpportunities = true;
        this.router.navigate([this.dataStorage.globalPathInformation.COMPANY_OPPORTUNITIES.PATH],  {
            queryParams : {
                'category': category,
              'opportunity' :  opportunity
            }
          });
    }
}
