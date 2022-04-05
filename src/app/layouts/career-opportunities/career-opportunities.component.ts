import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';


@Component({
  selector: 'app-career-opportunities',
  templateUrl: './career-opportunities.component.html',
  styleUrls: ['./career-opportunities.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CareerOpportunitiesComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService) {
     }

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
  }

}
