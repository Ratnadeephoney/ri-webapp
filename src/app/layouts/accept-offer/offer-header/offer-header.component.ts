import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { DataStorageService } from '../../../shared/service/data-storage.service';


@Component({
  selector: 'app-offer-header',
  templateUrl: './offer-header.component.html',
  styleUrls: ['./offer-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfferHeaderComponent implements OnInit {
    @Input('offerType') offerType: any;
  constructor(public dataStorage: DataStorageService) {
     }

  ngOnInit() {
  }

}
