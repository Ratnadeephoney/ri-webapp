import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Menu, NavService } from '../../../service/nav.service';
import { DataStorageService } from '../../../service/data-storage.service';
import { UserLoginComponent } from '../../pages/user-login/user-login.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MyAppHttpService } from '../../../service/my-app-http.service';
import { UserRegistrationComponent } from '../../pages/user-registration/user-registration.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-authorize-layout',
  templateUrl: './authorize-layout.component.html',
  styleUrls: ['./authorize-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthorizeLayoutComponent implements OnInit {

  activeUrl;
  openSideMenu: boolean;
  pathParam;
  constructor(public navServices: NavService,
    public dataStorage: DataStorageService,
    private modalService: NgbModal,
    private router: Router, private commonService: CommonService,
    private route: ActivatedRoute) { 
      console.log('usertype from layout', this.dataStorage.globalLoggedInUserData.userType);
    }

  ngOnInit() {
    this.activeUrl = this.router.url;

   this.route.params.subscribe((param) => {
    if(this.activeUrl.indexOf(MyAppHttpService.PathInformation.COMING_SOON.PATH) >-1){
      this.activeUrl = this.router.url;
      this.pathParam = this.route.snapshot.params.path;
    } 
    else{
      this.pathParam = '';
    }
    
   });
  }

  afterclick(){
    console.log('chat clicked in authorize', this.dataStorage.globalTotalChatUnreadCount);
    this.dataStorage.globalTotalChatUnreadCount = 0;
  }

  GetProfileData(){
    this.commonService.getUserProfileInfo().subscribe(response => {
      console.log('response of user info', response, response.userDetails.userName);
      if(response.userDetails){
        this.dataStorage.globalLoggedInUserData.userName = response.userDetails.userName;
      }
    })
  }

  onLogoutClick() {
    this.router.navigate(['/']);
    this.dataStorage.globalIsLoggedInUser = false;
    this.dataStorage.globalLoggedInUserData = { mobileNumber: '', userType: 0, userName: '', userId: 0 };
    localStorage.clear();

    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Logout', 'Logout Successful');
  }

  toggleSidebar() {
    this.openSideMenu = !this.openSideMenu;
  }

  closeOverlay(){
    this.openSideMenu = false;
  }
}
