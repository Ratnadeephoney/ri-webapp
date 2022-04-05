import { Component, OnInit, ViewEncapsulation, Input, AfterViewInit } from '@angular/core';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { CommonService } from '../../../shared/service/common.service';
import { MyAppHttpService } from '../../../shared/service/my-app-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-offer-transaction',
  templateUrl: './offer-transaction.component.html',
  styleUrls: ['./offer-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OfferTrasactionComponent implements OnInit, AfterViewInit {
  @Input('offerType') offerType: any;
  transactionId: any;
  response = {};
  offerRejectForm: FormGroup;
  submitted: boolean;

  constructor(public dataStorage: DataStorageService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params.trasactionId) {
        this.transactionId = (params.trasactionId);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    if (this.offerType == this.dataStorage.globalOfferTypes.ACCEPT) {
      this.acceptJobOffer();
    }
    else {
      this.getJobOfferStatus();
    }

  }

  ngAfterViewInit() {
    setTimeout(() => {
      const element = document.getElementById('divTransaction') as HTMLInputElement;
      if (!!element)
        element.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  }

  acceptJobOffer() {
    this.commonService.acceptJobOffer(this.transactionId).subscribe(success => {
      this.response = success;
      // if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){

      // }
    }, error => {

    });
  }


  rejectJobOffer() {
    if(this.offerRejectForm.invalid) {
      this.submitted = true;
      return false;
  }
  else {
      this.submitted = false;
  }

      this.commonService.rejectJobOffer(this.transactionId, this.offerRejectForm.value.comments).subscribe(success =>{
        this.response = success;
        // if(success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS){

        // }
     }, error =>{

     });
  }

  getJobOfferStatus() {
    this.commonService.getJobOfferStatus(this.transactionId).subscribe(success => {
      if (success.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
        this.offerRejectForm = this.fb.group({
          comments: ['', Validators.compose([Validators.required])]
        });
      }
      this.response = success;
    }, error => {

    });
  }

}
