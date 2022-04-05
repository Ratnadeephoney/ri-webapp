import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
  selector: 'app-jobs-header',
  templateUrl: './jobs-header.component.html',
  styleUrls: ['./jobs-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobsHeaderComponent implements OnInit {

  public url: any;
  public breadcrumbs;
  public title: string;
  searchForm: FormGroup;
  @Output('onSearchClick') onSearchClickEvent = new EventEmitter();

  
  constructor(private activatedRoute: ActivatedRoute,
    public dataStorage: DataStorageService,
    private router: Router) {
  
  }

  ngOnInit() {
    this.searchForm = new FormBuilder().group({
      'skills': [""],
      'locations': [""]
    });

    this.searchForm.controls['skills'].setValue(this.dataStorage.globalSelectedSKillsList);
    this.searchForm.controls['locations'].setValue(this.dataStorage.globalSelectedLocationsList);
    

    this.searchForm.controls['skills'].valueChanges.subscribe((value)=>{
      this.dataStorage.globalSelectedSKillsList = value;
    });
    this.searchForm.controls['locations'].valueChanges.subscribe((value)=>{
      this.dataStorage.globalSelectedLocationsList = value;
    });
  }

  onSearchClick(){
    this.onSearchClickEvent.emit({});
  }

  onScrollDownClick(){
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'smooth'
    });
  }

}
