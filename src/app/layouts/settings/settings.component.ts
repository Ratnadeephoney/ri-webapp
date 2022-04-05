import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'
import { CommonService } from 'src/app/shared/service/common.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {

  settingsData ={
    mailNotifications: false,
  mobileNotifications: false,
  mobileSMS: false,
  profileVideo: false,
  profileVisibility: false,
  shareAudioFile: false,
  shareFeedback: false,
  shareReportFile: false,
  shareResume: false
  };

  constructor(private _clipboardService: ClipboardService, public commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.getSettingsData();
  }

  getSettingsData(){
    this.commonService.GetSettingsData().subscribe(response=>{
      this.settingsData = response;
    }, error=>{

    });
  }

  onShareFeedbackClick(event){
    var tempSettings = {...this.settingsData};
    if(!event.target.checked){
      tempSettings.shareFeedback = false;
      tempSettings.shareReportFile =  false;
      tempSettings.shareAudioFile = false;
      tempSettings.shareResume = false;
    }
    else{
      tempSettings.shareFeedback = true;
      tempSettings.shareReportFile =  true;
      tempSettings.shareAudioFile = true;
      tempSettings.shareResume = true;
    }

     this.commonService.UpdateSettingsData(tempSettings).subscribe(response=>{
      this.settingsData = tempSettings;
    }, error=>{

    });
  }

  updateSettingsData(settings, key){
    var tempSettings = {...settings};
    tempSettings[key] = !tempSettings[key];
    this.commonService.UpdateSettingsData(tempSettings).subscribe(response=>{
      settings[key] = !settings[key];
    }, error=>{

    });
  }

}
