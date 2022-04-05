import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DataStorageService } from '../../../shared/service/data-storage.service';

@Component({
  selector: 'app-modern-about-other',
  templateUrl: './modern-about-other.component.html',
  styleUrls: ['./modern-about-other.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModernAboutOtherComponent implements OnInit {
  constructor(public dataStorage: DataStorageService) { }

  ngOnInit() {
  }

}
