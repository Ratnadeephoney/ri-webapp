import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../shared/service/common.service';
import { MyAppHttpService } from '../../shared/service/my-app-http.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InterviewerComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService, 
    private location: Location,
    private meta: Meta) {
     }

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
    this.updateTitle()
  }

  updateTitle() {
    let title = this.route.snapshot.data['title'];
    this.meta.addTag({ name: 'og:title', property: 'og:title', content: title });
    this.meta.addTag({ name: 'og:description', property: 'og:description', content: 'Rock Interview | Interviewer' });
    
    this.meta.addTag({ name: 'twitter:title', property: 'twitter:title', content: title });
    this.meta.addTag({ name: 'twitter:description', property: 'twitter:description', content: 'Rock Interview | Interviewer' });
  }

  ngAfterViewInit(){
    
      this.route.queryParams.subscribe(params => {
        setTimeout(() => {
        if(params.section){
          this.sectionScroll(params.section);
        }
        else{
          this.route.fragment.subscribe((fragment: string) => {
            if(fragment == 'peer-rating'){
              this.sectionScroll('divPeerRating');
            }
            else if(fragment == 'getsharebuild'){
              this.sectionScroll('divIntExperts');
            }
          })
		  
        }
      }, 200);
      });
  
  }

  sectionScroll(section){
    const element = document.getElementById(section) as HTMLInputElement;
    if(!!element)
    element.scrollIntoView({ behavior: 'smooth' , block: 'center'});

      this.location.replaceState(this.dataStorage.globalPathInformation.INTERVIEWER.PATH);
  }

}
