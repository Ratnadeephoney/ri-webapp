import { Component } from '@angular/core';
import { CustomizerService } from './shared/service/customizer.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from './shared/service/common.service';
import { DataStorageService } from './shared/service/data-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { MyAppHttpService } from './shared/service/my-app-http.service';
import { WebsocketService } from './shared/service/WebSocket.service';
// declare let fbq:Function;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public url: any;
  title = 'Unice';
  public layoutType: string = 'dark';
  switchToApp = true;

  constructor(public customize: CustomizerService, private router: Router, private commonService: CommonService
    , private dataStorage: DataStorageService, private translate: TranslateService, private http: Http, public wsService: WebsocketService) { 
      const config = environment.firebaseConfig;
      wsService.messages.subscribe(msg => {
        console.log('app component websocket', msg);
      });
      // firebase.initializeApp(config);
      // const analytics = firebase.analytics();
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        // fbq('track', 'PageView'); 
        if (!localStorage.getItem("token")) {
          if(event.url.indexOf('/my-profile')  > -1 
            || event.url.indexOf('/hiring-id')  > -1
            || event.url.indexOf('/setup-interview')  > -1
            || event.url.indexOf('/become-mentor-new')  > -1
            || event.url.indexOf('/certificates')  > -1
            || event.url.indexOf('/settings')  > -1
            || event.url.indexOf('/bank-details')  > -1
            || event.url.indexOf('/my-videos')  > -1
            ){
              this.router.navigate(['/']);
          }
        }
      }
    });

    translate.addLangs(["en"]);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en/) ? browserLang : 'en');

  }

  ngOnInit(){
    this.getAllSkills();
    this.getAllLocations();
    this.commonService.GettingChatUnread();
    
    if(localStorage.getItem('token')){
      this.dataStorage.globalIsLoggedInUser = true;
      this.dataStorage.globalLoggedInUserData = JSON.parse(localStorage.getItem('userData')) ;
    }

    setTimeout(() => {
      if (this.dataStorage.globalLoggedInUserData.userId != "") {
        var data = { userId: this.dataStorage.globalLoggedInUserData.userId, userType: MyAppHttpService.CHAT_TYPES.RI };
        this.wsService.invokeWebSocketFunction(data, 'update');
        console.log('firing websocket in app component');
      }
    }, 2000);
  }


  getAllSkills(){
    this.commonService.getAllSkills().subscribe(success =>{
       this.dataStorage.globalSkillsList = success.listOfTechnologies;
       this.dataStorage.sub_GlobalSkills.next();
    }, error =>{

    });
  }

  getAllLocations(){
    this.commonService.getAllLocations().subscribe(success =>{
      this.dataStorage.globalLocationsList = success.listOfLocations;
   }, error =>{

   });
  }

  customizeLayoutVersion(val) {
    this.customize.setLayoutVersion(val)
    this.layoutType = val
  }

  customizeLayoutType(val) {
    this.customize.setLayoutType(val)
    this.layoutType = val
  }

}
