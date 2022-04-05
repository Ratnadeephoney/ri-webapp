import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataStorageService } from '../../../shared/service/data-storage.service';

@Component({
  selector: 'app-modern-ebook',
  templateUrl: './modern-ebook.component.html',
  styleUrls: ['./modern-ebook.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModernEBookComponent implements OnInit {

  constructor(public dataStorage: DataStorageService) { }

  ngOnInit() {
    
  }

}
