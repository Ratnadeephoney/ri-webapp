import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../../shared/service/common.service';
import { DataStorageService } from '../../../shared/service/data-storage.service';

@Component({
  selector: 'app-modern-header',
  templateUrl: './modern-header.component.html',
  styleUrls: ['./modern-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModernHeaderComponent implements OnInit {
  
  skillsList;
  locationsList;

  ecombannerOptions = {
    items: 1,
    nav: true,
    navClass: ['owl-prev', 'owl-next'],
    navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
    dots: false,
    autoplay: false,
    slideSpeed: 300,
    loop: true,
    autoplayHoverPause: true,
  }


  constructor(private commonService: CommonService, public dataStorage: DataStorageService) { }

  ngOnInit() {
  }

 

}
