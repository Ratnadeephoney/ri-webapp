import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mentors-list',
  templateUrl: './mentors-list.component.html',
  styleUrls: ['./mentors-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MentorsListComponent implements OnInit {

  MentorsList: any = [];
  // skillsList = new FormControl();
  SkillsSelected: any = [];
  searchForm: FormGroup;
  Mentorsdata: boolean = false;
  perPageItems = [5, 10, 15, 20, 25];
  selectedPage = this.perPageItems[0];
  paginationProps = { itemsPerPage: this.perPageItems[0], currentPage: 1, totalItems: 200 };
  offset: any = 0;

  constructor(private _clipboardService: ClipboardService, public dataStorage: DataStorageService, public commonService: CommonService, private router: Router) { 
    // this.paginationProps.currentPage = 1;
    this.GetMentorsList([]);
    // this.onSearchClick([]);
    this.searchForm = new FormBuilder().group({
      'skills': [""],
      'locations': [""]
    });

    this.searchForm.controls['skills'].valueChanges.subscribe((changed)=>{
      console.log('value', changed);
      this.SkillsSelected = changed;
      // this.onSearchClick(changed);
      this.GetMentorsList(changed);
    })
  }

  ngOnInit(): void {
  }

  onSearchClick(skills){
    // console.log('searched skill', this.searchForm.controls['skills'].value);
    this.paginationProps.currentPage = 1;
    this.offset = 0;
    this.GetMentorsList(skills);
  }

  onPageChanges(event) {
    this.paginationProps.currentPage = event;
    this.offset = this.paginationProps.itemsPerPage * (event - 1)
    this.GetMentorsList(this.SkillsSelected);
  }

  onPerPageChange(event) {
    this.paginationProps.itemsPerPage = event.currentTarget.value;
    this.paginationProps.currentPage = 1;
    this.offset = 0;
    this.GetMentorsList(this.SkillsSelected);
  }

  // GetMentorsList(skills){
  //   let inputData = {
  //     "skillIds": skills,
  //     "limit": this.paginationProps.itemsPerPage,
  //     "offset": this.offset,
  //   }

  //   this.commonService.getAllMentorsList(inputData).subscribe(response => {
  //     console.log('Response: ', response);
  //     this.MentorsList = response.mentorsList;
  //     this.Mentorsdata = true;
  //   })
  // }

  GetMentorsList(skills){
    let inputData = {
      "skillIds": skills,
      "limit": null,
      "offset": 0,
    }

    this.commonService.getAllMentorsList(inputData).subscribe(response => {
      console.log('Response: ', response);
      this.MentorsList = response.mentorsList;
      this.Mentorsdata = true;
    })
  }

  gotochat(mentor){
    if(mentor){
      this.dataStorage.DataFromMentorsList = mentor;
      this.router.navigate([MyAppHttpService.PathInformation.CHAT.PATH]);
    }
  }


  convertToYandM(months): string {

    if (!months || months == '-1' || months == '0') {

      if (months == '0') {
        return '0 year';
      }

      return ("");

    } else {

      let yearCalculated: any = (months / 12 | 0);
      let monthCalculated: any = (months % 12 | 0);

      // yearCalculated =  (yearCalculated == 0 || yearCalculated == -1) ? "" : yearCalculated + " y  " ;
      // monthCalculated = (monthCalculated == 0 || monthCalculated == -1) ? "" : monthCalculated + " m ";
      yearCalculated = yearCalculated + " years  ";
      if (monthCalculated != 0) {
        monthCalculated = monthCalculated + " months ";
      }
      if (monthCalculated != 0) {
        return (yearCalculated + monthCalculated);
      } else {
        return yearCalculated;
      }
    }
  }

}
