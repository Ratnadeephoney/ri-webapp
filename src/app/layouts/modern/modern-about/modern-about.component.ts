import { Component, OnInit, Input } from '@angular/core';
import { DataStorageService } from '../../../shared/service/data-storage.service';

@Component({
  selector: 'app-modern-about',
  templateUrl: './modern-about.component.html',
  styleUrls: ['./modern-about.component.scss']
})
export class ModernAboutComponent implements OnInit {
  constructor(public dataStorage: DataStorageService) { }

  ngOnInit() {
  }
 
}
