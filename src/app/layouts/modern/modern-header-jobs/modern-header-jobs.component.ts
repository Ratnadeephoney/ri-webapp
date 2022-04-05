import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonService } from '../../../shared/service/common.service';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modern-header-jobs',
  templateUrl: './modern-header-jobs.component.html',
  styleUrls: ['./modern-header-jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModernHeaderJobsComponent implements OnInit, AfterViewInit {

  searchForm: FormGroup;
  selectedSkills;
  selectedLocations;
  showDefaultSkillsList: boolean;
  topJobsAndCounts = [];

  @ViewChild('skill') skill;


  constructor(public dataStorage: DataStorageService, public commonService: CommonService) {
    this.searchForm = new FormBuilder().group({
      'skills': [""],
      'locations': [""]
    });
    // this.showDefaultSkillsList = true;
    // this.getTopJobsAndCounts();
  }

  ngOnInit() {
    this.searchForm.controls['skills'].valueChanges.subscribe((value) => {
      this.selectedSkills = value.map(String);
      this.dataStorage.globalSelectedSKillsList = value.map(String);
    });
    this.searchForm.controls['locations'].valueChanges.subscribe((value) => {
      this.selectedLocations = value;
      this.dataStorage.globalSelectedLocationsList = value;
    });

    

  }
  ngAfterViewInit() {
    setTimeout(() => {
      //this.skill.handleArrowClick();
      this.skill.focus();
    }, 10);

  }

  // getTopJobsAndCounts() {
  //   this.commonService.getTopJobsAndCounts().subscribe(response => {
  //     if(response && response.statusCode == 200) {
  //       this.topJobsAndCounts = response.jobs;
  //     }
  //   })
  // }

  setSkill(skill) {
    let s = [skill.technologyId.toString()]
    this.searchForm.controls['skills'].setValue(s);
    this.showDefaultSkillsList = false;
  }

}
