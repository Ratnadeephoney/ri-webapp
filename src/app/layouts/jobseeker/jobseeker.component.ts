import { Component, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-jobseeker',
  templateUrl: './jobseeker.component.html',
  styleUrls: ['./jobseeker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobseekerComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService,
    private location: Location, private router: Router,
    private cdr: ChangeDetectorRef, 
    private meta: Meta) {
    
     }

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
    this.updateTitle();
  }

  updateTitle() {
    let title = this.route.snapshot.data['title'];
    this.meta.addTag({ name: 'og:title', property: 'og:title', content: title });
    this.meta.addTag({ name: 'og:description', property: 'og:description', content: 'Rock Interview | Jobseeker' });
    
    this.meta.addTag({ name: 'twitter:title', property: 'twitter:title', content: title });
    this.meta.addTag({ name: 'twitter:description', property: 'twitter:description', content: 'Rock Interview | Jobseeker' });
  }

  ngAfterViewInit(){
      this.route.queryParams.subscribe(params => {
        setTimeout(() => {
          if(params.section){
           this.sectionScroll(params.section);
          }
          else{
            this.route.fragment.subscribe((fragment: string) => {
              if(fragment == 'assessment'){
                this.sectionScroll('divAssessment');
              }
            })
          }
        }, 200);
       
      });
   
  }

  sectionScroll(section){
    const element = document.getElementById(section) as HTMLInputElement;
    if(!!element)
      element.scrollIntoView({ behavior: 'smooth' , block: "center"});
      this.cdr.detectChanges();
      this.location.replaceState(this.dataStorage.globalPathInformation.JOBSEEKER.PATH);
  }

}
