import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
    selector: 'app-interviewer-read-faq',
    templateUrl: './interviewer-read-faq.component.html',
    styleUrls: ['./interviewer-read-faq.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InterviewerReadFAQComponent implements OnInit {
  @Input('pathName') pathName: any;
    constructor(public dataStorage: DataStorageService, private router: Router) {
    }

    ngOnInit() {
    }

    onReadFAQClick(){
      var section = '';
      if(this.pathName == this.dataStorage.globalPathInformation.JOBSEEKER.PATH){
        section = 'divJobSeeker';
      }
      else if(this.pathName == this.dataStorage.globalPathInformation.INTERVIEWER.PATH){
        section = 'divInterviewer';
      }

        this.router.navigate([this.dataStorage.globalPathInformation.COMPANY_FAQ.PATH],  {
            queryParams : {
              'section' : section
            }
          });
    }



}
