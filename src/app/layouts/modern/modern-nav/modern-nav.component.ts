import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-modern-nav',
  templateUrl: './modern-nav.component.html',
  styleUrls: ['./modern-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModernNavComponent implements OnInit {
  @Output('onFindModuleClick') onFindModuleClick = new EventEmitter();
  @Input('selectedModule') selectedModule: any;
  selectedMenu;
  enterpriseUrl = environment.enterpriseUrl;

  constructor(public dataStorage: DataStorageService,private router : Router, public commonService: CommonService) { }

  ngOnInit() {
    this.selectedModule = this.selectedModule;
  }

  GetProfileData(){
    this.commonService.getUserProfileInfo().subscribe(response => {
      console.log('response of user info', response, response.userDetails.userName);
      if(response.userDetails){
        this.dataStorage.globalLoggedInUserData.userName = response.userDetails.userName;
      }
    })
  }

  onModuleClick(module){
    this.selectedModule  = module;
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
