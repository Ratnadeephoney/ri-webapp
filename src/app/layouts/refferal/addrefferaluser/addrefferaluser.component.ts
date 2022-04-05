
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';


@Component({
  selector: 'app-addrefferaluser',
  templateUrl: './addrefferaluser.component.html',
  styleUrls: ['./addrefferaluser.component.scss']
})
export class AddrefferaluserComponent implements OnInit {

  addForm =new FormGroup({
    userName : new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z. ]{2,}")]),
    mobileNumer : new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), this.SameMobileNumberValidator()]),
    role : new FormControl('',Validators.required),
    userEmail : new FormControl('',[Validators.email,Validators.required])
  });

  initializeRefFormGroup(){
    this.addForm.setValue({
      userName :'',
      mobileNumer : '',
      role : '',
      userEmail : ''

    });
  }

  constructor(
    //public service : AddrefferaluserService,
    public dailogRef : MatDialogRef<AddrefferaluserComponent>,
    public commonService :CommonService,
    public dataStorage: DataStorageService
  ) { }

  ngOnInit(): void {
    
  }

 //close(refUser : any){
   //this.dailogRef.close(refUser);
 //}

onSubmit(){
  console.log(this.addForm.value);
 this.commonService.addReferalUser(this.addForm.value).subscribe(response => {
    console.log('addReferalUser response: ', response);
    console.log('addReferalUser response: ', response.statusCode);

  this.addForm.reset();
  this.initializeRefFormGroup();
  if(response.statusCode === 409){
    this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'User already Added', ' You have already added this user');
  }
  else{
    this.onClose(response.statusCode);
  }
 });
}//submit

onClose(x : number){
  console.log("----------- local data> ",JSON.parse(localStorage.getItem('userData')));
  console.log("----->  ",this.dataStorage.globalLoggedInUserData.mobileNumber)
  this.addForm.reset();
  this.initializeRefFormGroup();
  this.dailogRef.close(x);
}

 SameMobileNumberValidator() : ValidatorFn{
   return (control : AbstractControl) : {[key : string] : boolean} | null =>{
     if(control.value == this.dataStorage.globalLoggedInUserData.mobileNumber){
        return {'SameMobileNumberNotAllowed' : true}
     }
     return null;
   }

}//fn

}
