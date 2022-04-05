import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataStorageService } from '../../../../shared/service/data-storage.service';

@Component({
  selector: 'app-header-template',
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderTemplateComponent implements OnInit {

  @Input('mode') mode: any;
  @Input('skillsList') skillsList: any; 
  @Input('locationsList') locationsList: any;   
  searchForm: FormGroup;
  selectedSkills;
  selectedLocations;

  
 
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

}
