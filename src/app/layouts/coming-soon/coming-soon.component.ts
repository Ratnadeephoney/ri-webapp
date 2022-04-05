import { Component, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from '../../shared/components/pages/feedback/feedback.component';
import { DownloadAppComponent } from '../../shared/components/pages/download-app/download-app.component';


@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComingSoonComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService,
    private location: Location, private router: Router,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal) {
    
     }

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
  }

  onAppClick(){
    this.modalService.open(DownloadAppComponent,{});
  }


}
