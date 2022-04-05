import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'
import { ColorScssService } from 'src/app/shared/service/color-scss.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hiring-id',
  templateUrl: './hiring-id.component.html',
  styleUrls: ['./hiring-id.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HiringIdComponent implements OnInit {

  HiringDetails: any = null;

  constructor(private _clipboardService: ClipboardService, public commonService: CommonService, private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService) { 
    // this._clipboardService.copy('copied');
    this.GetHiringDetails();
  }

  GetHiringDetails(){
    this.commonService.getHiringIdDetails().subscribe(response => {
      console.log('response of Hiring id', response);
      if(response.statusCode == 200){
        this.HiringDetails = response.hiringIdDetails;
      }
    }, error=>{

    })
  }

  ngOnInit(): void {
    this.title.setTitle(this.route.snapshot.data['title']);
    this.colorPicker.setColorScheme('color-2');
  }

  CopyId(){
    let url = environment.enterpriseUrl + 'hiring-id?hiringId=' + this.HiringDetails.hiringId;
    console.log('url copied', url);
    this._clipboardService.copy(url);
    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Copy Id', 'Copied to Clipboard');
  }

  ScheduleInterview(){
    this.router.navigate([MyAppHttpService.PathInformation.SETUP_INTERVIEW.PATH]);
  }

}
