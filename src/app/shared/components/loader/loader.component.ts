import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataStorageService } from '../../service/data-storage.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {

  //public show: boolean = true;

  constructor(public dataStorage: DataStorageService) {
    setTimeout(() => {
      this.dataStorage.globalShowLoader = false;
    }, 1500);
  }

  ngOnInit() { }

  ngOnDestroy() { }
 
}
