import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../../../service/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-footer',
  templateUrl: './detailed-footer.component.html',
  styleUrls: ['./detailed-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailedFooterComponent implements OnInit {
  @Output('onFindModuleClick') onFindModuleClick = new EventEmitter();

  constructor(public dataStorage: DataStorageService, private router: Router) { }

  ngOnInit() {
  }

  
  onModuleClick(module){
    if(this.router.url == '/' ||  this.router.url.indexOf('/?') == 0){
      this.onFindModuleClick.emit({moduleName: module});
    }
   else{
    this.router.navigate(['/'],  {
      queryParams : {
        'module' : module
      }
    });
   }

  }


}
