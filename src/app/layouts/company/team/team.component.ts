import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ColorScssService } from '../../../shared/service/color-scss.service';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService, 
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
    this.meta.addTag({ name: 'og:description', property: 'og:description', content: 'Rock Interview | Team' });
    
    this.meta.addTag({ name: 'twitter:title', property: 'twitter:title', content: title });
    this.meta.addTag({ name: 'twitter:description', property: 'twitter:description', content: 'Rock Interview | Team' });
  }

}
