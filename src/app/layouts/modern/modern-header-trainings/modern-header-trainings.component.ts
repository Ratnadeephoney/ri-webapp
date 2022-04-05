import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../shared/service/common.service';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modern-header-trainings',
  templateUrl: './modern-header-trainings.component.html',
  styleUrls: ['./modern-header-trainings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModernHeaderTrainingsComponent implements OnInit, AfterViewInit {

  searchForm: FormGroup;
  selectedSkills;
  selectedLocations;
  showDefaultSkillsList: boolean;
  topTrainingsAndCounts = [];
  @ViewChild('skill') skill;



  constructor(public dataStorage: DataStorageService, public commonService: CommonService) {
    this.searchForm = new FormBuilder().group({
      'skills': [""],
      'locations': [""]
    });
    // this.showDefaultSkillsList = true;
    // this.getTopTrainingsAndCounts();
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

  // getTopTrainingsAndCounts() {
  //   this.commonService.getTopTrainingsAndCounts().subscribe(response => {
  //     if (response && response.statusCode == 200) {
  //       this.topTrainingsAndCounts = response.trainings;
  //     }
  //   })
  // }

  setSkill(skill) {
    let s = [skill.technologyId.toString()]
    this.searchForm.controls['skills'].setValue(s);
    this.showDefaultSkillsList = false;
  }

}
