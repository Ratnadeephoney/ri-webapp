import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Certificate } from 'crypto';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { DownloadReportsComponent } from '../interviews/download-reports/download-reports.component';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CertificatesComponent implements OnInit {
  certificatesList: any = [];
  isDataAvailable: boolean;
  downloader: any;
  certificateTitle: any;
  navCtrl: any;


  constructor(public dataStorage: DataStorageService, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCertificates();
  }
  getAllCertificates() {
    console.log('logged in user data: ', this.dataStorage.loggedInUserData);
    this.commonService.getAllCertificates().subscribe(response => {
      setTimeout(() => {
        this.isDataAvailable = true;  
      }, 500);
      if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.certificatesList = [...response.hiringCertifications, ...response.trainingCertification];
        console.log('Certificates: ', this.certificatesList);


      }
      else {
        this.certificatesList = [];
      }
    })


  }

  onDownloadClick(certificate) {

    var requestObj = {
      Path: certificate.certificatePath,
      title: certificate.certificateName,
    };
    console.log('requestObj:', requestObj);
    this.dataStorage.globalShowLoader = true;
    this.commonService.GettingContentType(certificate.certificatePath).subscribe((response) => {

      var newBlob = response;
      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      // For other browsers: 
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download = certificate.certificateName;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Certificate', 'Downloaded Successfully');
      this.dataStorage.globalShowLoader = false;
    }, error => {
      this.dataStorage.globalShowLoader = false;
      this.commonService.showToast(MyAppHttpService.ToastType.ERROR, 'Download Certificate', 'Something went wrong');
    });
    console.log("Certificate file path : ", certificate);
  }

  goToSetupInterview() {

    this.router.navigate([MyAppHttpService.PathInformation.SETUP_INTERVIEW.PATH]);

  }
}
