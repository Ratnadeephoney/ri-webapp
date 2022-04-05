import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Menu, NavService } from '../../../service/nav.service';
import { DataStorageService } from '../../../service/data-storage.service';
import { UserLoginComponent } from '../../pages/user-login/user-login.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MyAppHttpService } from '../../../service/my-app-http.service';
import { UserRegistrationComponent } from '../../pages/user-registration/user-registration.component';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  public menuItems: Menu[];
  public openSide : boolean = false;
  public activeItem: string = 'home';
  public active: boolean = false;
  public activeChildItem : string = '' 
  public overlay: boolean = false;
  currentRoute: string;

  @Output('onFindModuleClick') onFindModuleClick = new EventEmitter();
  
  constructor( public navServices: NavService,
    public dataStorage: DataStorageService,
    private modalService: NgbModal,
    private router: Router, private commonService: CommonService) { }
 
  ngOnInit() {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems
    });
    this.currentRoute = this.router.url;
  }

  afterclick(){
    console.log('chat clicked in menu', this.dataStorage.globalTotalChatUnreadCount);
    this.dataStorage.globalTotalChatUnreadCount = 0;
  }

  toggleSidebar(){
    this.openSide = !this.openSide
  }

  closeOverlay(){
    this.openSide = false
  }

  //For Active Main menu in Mobile View
  setActive(menuItem){
    if (this.activeItem === menuItem) {
      this.activeItem = ''
    } else {
      this.activeItem = menuItem
    }
  }

  isActive(item){
    return this.activeItem === item 
  }

  // For Active Child Menu in Mobile View
  setChildActive(subMenu){
    if (this.activeChildItem === subMenu) {
      this.activeChildItem = ''
    } else {
      this.activeChildItem = subMenu
    }
  }

  ischildActive(subMenu){
    return this.activeChildItem === subMenu 
  }

  onModuleClick(module){
    this.onFindModuleClick.emit(module);
  }

  onLoginClick(){
    
    var modalRefLogin = this.modalService.open(UserLoginComponent, this.dataStorage.globalNgbModalOptions);
    modalRefLogin.componentInstance.data = {operation: null};

    modalRefLogin.result.then((e)=>{
      this.dataStorage.loggedInFromMenu.next(true);
      if(e.returnObj.statusCode == MyAppHttpService.RESPONSE_CODES.USER_NOT_EXISTS){
        // var modalRefRegistration = this.modalService.open(UserRegistrationComponent, this.dataStorage.globalNgbModalOptions);
        // modalRefRegistration.componentInstance.data = {mobileNumber: e.returnObj.mobileNumber, sessionId: e.returnObj.sessionId, operation: null, jobData: null, trainingData: null};
        // modalRefRegistration.result.then((e)=>{

     
        // });
        this.router.navigate([MyAppHttpService.PathInformation.MY_PROFILE.PATH]);
      }
    });
  }

  onLogoutClick(){
    this.router.navigate(['/']);
    this.dataStorage.globalIsLoggedInUser = false;
    this.dataStorage.globalLoggedInUserData = {mobileNumber: '', userType: 0, userName: '', userId: 0};
    localStorage.clear();

    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Logout', 'Logout Successful');
  }

}
