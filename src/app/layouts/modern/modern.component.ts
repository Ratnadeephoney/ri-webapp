import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import {Location} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LaunchPopupComponent } from '../../shared/components/pages/launch-popup/launch-popup.component';


@Component({
  selector: 'app-modern',
  templateUrl: './modern.component.html',
  styleUrls: ['./modern.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModernComponent implements OnInit, AfterViewInit {
  selectedModule;

  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService, private location:Location,
    private modalService: NgbModal, private titleService: Title, private meta: Meta) {

      this.route.queryParams.subscribe(params => {
        if(params.module){
          this.selectedModule = (params.module);
        }
        else{
          this.selectedModule = this.dataStorage.globalModuleNames.JOBS;
        }
      });

      this.location.replaceState("/");

     }

  ngOnInit() {
    // this.title.setTitle(this.route.snapshot.data['title']);
    // this.title.setTitle("Rock Interview | The Career Transformation App");
    this.colorPicker.setColorScheme('color-2');

    this.resetGlobalSelectedInfo();
    this.updateTitleData();
  }

  ngAfterViewInit(){
    if(!this.dataStorage.isLaunchScreenOpened){
      this.modalService.open(LaunchPopupComponent,{ centered: true, size: 'xl', windowClass: 'NewClass' })
      this.dataStorage.isLaunchScreenOpened = true;
    }
  }

  onFindModuleClick(event){
    this.resetGlobalSelectedInfo();
    this.selectedModule = event.moduleName;

    const element = document.getElementById('divHeaderSection') as HTMLInputElement;
    if(!!element)
      element.scrollIntoView({ behavior: 'smooth' });
    
  }

  resetGlobalSelectedInfo(){
    this.dataStorage.globalSelectedSKillsList =[];
    this.dataStorage.globalSelectedLocationsList = [];
  }

  updateTitleData() {
    // let title = "Rock Interview | The Career Transformation App";
    let title = this.route.snapshot.data['title']
    this.titleService.setTitle(title);
    this.meta.addTag({ name: 'og:title', property: 'og:title', content: title });
    this.meta.addTag({ name: 'og:description', property: 'og:description', content: 'Rock Interview | The Career Transformation App' });
    
    this.meta.addTag({ name: 'twitter:title', property: 'twitter:title', content: title });
    this.meta.addTag({ name: 'twitter:description', property: 'twitter:description', content: 'Rock Interview | The Career Transformation App' });
  }


}
