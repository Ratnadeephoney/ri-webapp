import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../shared/service/common.service';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-modern-header-profiles',
  templateUrl: './modern-header-profiles.component.html',
  styleUrls: ['./modern-header-profiles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModernHeaderProfilesComponent implements OnInit, AfterViewInit {
  searchForm: FormGroup;
  selectedSkills =[];
  selectedLocations=[];
  enterpriseUrl: string = environment.enterpriseUrl;
  @ViewChild('skill') skill;

  
 
  constructor(public dataStorage: DataStorageService) {
    this.searchForm = new FormBuilder().group({
      'skills': [""],
      'locations': [""]
    });
   }

  ngOnInit() {
    this.searchForm.controls['skills'].valueChanges.subscribe((value)=>{
      this.selectedSkills = value;
      this.dataStorage.globalSelectedSKillsList = value;
    });
    this.searchForm.controls['locations'].valueChanges.subscribe((value)=>{
      this.selectedLocations = value;
      this.dataStorage.globalSelectedLocationsList = value;
    });
  }

  onSearchClick(){
    var redirectUrl = `${this.enterpriseUrl}findprofile?skillIds=${this.selectedSkills.join(',')}&locationIds=${this.selectedLocations.join(',')}`;
    window.open(redirectUrl, "_blank");
  }

  ngAfterViewInit(){
    setTimeout(() => {
      //this.skill.handleArrowClick(); 
      this.skill.focus();
    }, 10); 
    
 }
 

}
