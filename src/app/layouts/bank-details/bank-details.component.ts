import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { reset } from 'mousetrap';
import { ToastrService } from 'ngx-toastr';
import { ColorScssService } from 'src/app/shared/service/color-scss.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';

type bankSearch = any;

//type NewType = MyLoggerService;

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BankDetailsComponent implements OnInit {

  bankForm: FormGroup;
  submitted = false;
  
      validation_messages = {
      'branchname': [
        { type: 'required', message: 'Please enter valid Branch Name' },
        { type: 'pattern', message: 'Please enter valid BranchName.' },
        { type: 'minLength', message: 'Name minimum length should be greate than 0' },
        { type: 'maxLength', message: 'Name maximum length should not be less than 30 characters' }
      ],

      'ifsccode': [
        { type: 'required', message: 'Please enter valid IFSC Code' },
        { type: 'pattern', message: 'Please enter valid IFSC Code.' },
        { type: 'minLength', message: 'Code minimum length should be greate than 0' },
        { type: 'maxLength', message: 'Code maximum length should not be less than 14 characters' }
      ],

      'accountnumber': [
        { type: 'required', message: 'Please enter valid Account Number' },
        { type: 'pattern', message: 'Please enter valid AccountNumber.' },
        { type: 'minLength', message: 'Number minimum length should be greate than 0' },
        { type: 'maxLength', message: 'Number maximum length should not be less than 18 characters' }
      ],

      'bankname': [
        { type: 'required', message: 'Please enter valid Bank Name' },
        { type: 'pattern', message: 'Please enter valid BankName.' },
        { type: 'minLength', message: 'Number minimum length should be greate than 0' },
        { type: 'maxLength', message: 'Number maximum length should not be less than 18 characters' }
      ],
    }
 
  myBankDetails: any;
  selectedBank: any;
  logger: any;
  banksList: any;
  bankName: any;
  

  // name:any[]=[
  //   {valueSending:86, viewValue:'andhra'},
  //   {valueSending:84, viewValue:'bank bank'},
  //   {valueSending:36, viewValue:'BANK OF MAHARASTRA'},
  //   {valueSending:64, viewValue:'BANKAMERICA'},
  //   {valueSending:37, viewValue:'BHARATIYA MAHILA BANK LIMITED'},
  //   {valueSending:56, viewValue:'HDFC'},
  //   {valueSending:20, viewValue:'ICICI'},
  //   {valueSending:82, viewValue:'Indian Overseas Bank'},
  //   {valueSending:55, viewValue:'KOTAK BANK'},
  //   {valueSending:10, viewValue:'KOTAK Mahindra Bank'},
  //   {valueSending:83, viewValue:'New Bank from Admin'},
  //   {valueSending:31, viewValue:'State Bank Of Indiaaa'},
  //   {valueSending:68, viewValue:'Syndicate Bank'},
  //   {valueSending:45, viewValue:'Test Bank'},
  // ]
  
  viewValue: any;
  bankNamesList: any[];
  selectedbankName: any;
  
  

  constructor(private router: Router,private dataStorage:DataStorageService,
    public commonService: CommonService, private toastService:ToastrService, private route: ActivatedRoute,
    private title: Title,
    public colorPicker: ColorScssService) { }



    ngOnInit() {

      this.title.setTitle(this.route.snapshot.data['title']);
      this.colorPicker.setColorScheme('color-2');

      this.bankForm = new FormBuilder().group({
        bankName:[null, Validators.compose([Validators.required,])],
        accountNumber:[null, Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.BANK_ACCOUNT_NUMBER), Validators.maxLength(18)])],
        //ifsccode:[null,Validators.compose([Validators.required,  Validators.maxLength(14)])],
        branchName:[null, Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.BANK_BRANCH_NAME), Validators.maxLength(30)])],
        ifscCode: [null, Validators.compose([Validators.required, Validators.pattern(MyAppHttpService.VALIDATION_PATTERNS.BANK_IFSC_CODE), Validators.maxLength(14)])]
        
      })
      this.getBankDetails();
      this.getBankNames();    
                    // this.bankForm.controls['bankName'].valueChanges.subscribe((valuechanged) => {
                    //   console.log('valuechange',valuechanged);
                    //   debugger;
                    //   for(var i=0;i<this.banksList.length;i++)
                    //   {
                    //     console.log(this.banksList[i]);
                    //     console.log('id',this.banksList[i].bankId);
                    //      if(valuechanged==this.banksList[i].bankId)
                    //      {
                    //         this.selectedbankName=this.banksList[i].userName;
                    //         console.log('bankName',this.selectedbankName);
                    //      }
                    //   }
                    
                    // });
    }

      getBankNames() {
        //throw new Error('Method not implemented.');
        this.commonService.getAllBanks().subscribe(response => {
        
          if (response && response.statusCode == 200) {
            console.log('get All Banks', response);
            this.dataStorage.bankNamesList = response.banksList;
            this.bankNamesList = response.banksList;
            
          }
        });
      }
      getBankDetails() {
        //throw new Error('Method not implemented.');
        this.commonService.bankDetails().subscribe((apiResponse) => {
          console.log('response of bankDetails', apiResponse);
          if(apiResponse && apiResponse.statusCode == 200){
            this.myBankDetails = apiResponse.bankDetailsDto
            this.prepareFormData(apiResponse.bankDetailsDto);
          }
        }, error => {
          console.log(error);
        }, () => {
        })
      }
      prepareFormData(bankdetails) {
        //throw new Error('Method not implemented.');
        if(!!bankdetails) {
          this.bankForm.patchValue(
            {
              'accountNumber': bankdetails.accountNumber,
              'bankName': bankdetails.bankId,
              'branchName': bankdetails.branchName,
              'ifscCode': bankdetails.bankIFSCCode
            }
          );
        }
      }

      saveDetails(){
        console.log('Bank save method');
        if(this.bankForm.valid){
          this.submitted = false;
        
          
          let requestobj={
          
          accountNumber: this.bankForm.value.accountNumber,
            bankDetailsId: !!this.myBankDetails?this.myBankDetails.bankDetailsId:null,
            bankId: this.bankForm.value.bankName,
          // bankId:this.bankForm.value.bankId,
            //bankId: !!this.myBankDetails ? this.myBankDetails.bankId : this.myBankDetails.bankId,
            //bankName: !!this.selectedBank ? this.selectedBank.bankName : this.myBankDetails.bankName,
            bankName: this.bankForm.value.bankName ? this.bankNamesList.find(x=>x.bankId ==  this.bankForm.value.bankName).bankName : null,
            branchName:this.bankForm.value.branchName,
            ifscCode:this.bankForm.value.ifscCode,

          };
          console.log('requestData',requestobj);
          console.log('saving bank details', requestobj);
          this.commonService.saveBankDetails(requestobj).subscribe((response)=>{
            console.log('response',response);
            if(response && response.statusCode == 200){
              this.getBankDetails();
              
              //this.toastService.presentToast('Bank Details Updated Sucessfully');
              //this.logger.openSnackbar('Bank Details Updated Successfully');
              this.bankForm.reset();
              
              this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, '', 'Bank Details Updated Successfully.')
            }
                          
              this.banksList=[''];
                      
          })
        }
        else{
          this.submitted = true;
        }
      }
}
