import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorScssService } from '../../shared/service/color-scss.service';
import { DataStorageService } from '../../shared/service/data-storage.service';


@Component({
  selector: 'app-reject-offer',
  templateUrl: './reject-offer.component.html',
  styleUrls: ['./reject-offer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RejectOfferComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private title: Title,
    private router: Router,
    public colorPicker: ColorScssService,
    public dataStorage: DataStorageService) {
     
    }


  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
  }

}
