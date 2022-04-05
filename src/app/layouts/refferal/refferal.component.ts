import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertCompComponent } from '../alert-comp/alert-comp.component';
import { MatDialog, MatDialogConfig,MatDialogRef } from '@angular/material/dialog';
import { AddrefferaluserComponent } from './addrefferaluser/addrefferaluser.component';
import { ViewfeedbackComponent } from './viewfeedback/viewfeedback.component';
import { GivefeedbackComponent } from './givefeedback/givefeedback.component';
import { response } from 'express';


@Component({
  selector: 'app-refferal',
  templateUrl: './refferal.component.html',
  styleUrls: ['./refferal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RefferalComponent implements OnInit {

  selectedTab = 'JS';
  userList=[];
  intialName = [];
  giveRefData ={};
 
  
  userData: any;
  interviewStatusIds;
  selectedStatusId;
  isDataLoaded: boolean;
  perPageItems = [5, 10, 15, 20, 25];
  paginationProps = { itemsPerPage: this.perPageItems[0], currentPage: 1, totalItems: 200 };

  constructor( 
    public dailog: MatDialog,
    private route: ActivatedRoute,
    private title: Title,
    public dataStorage: DataStorageService,
    public modalService: NgbModal,
    public commonService: CommonService,
    private router: Router
    ) {}

  ngOnInit() {

    console.log('Global skills: ', this.dataStorage.globalSkillsList);

    this.title.setTitle(this.route.snapshot.data['title']);

    
    if (this.dataStorage.globalIsLoggedInUser) {
      this.userData = JSON.parse(localStorage.getItem('userData'));
    }

    this.isDataLoaded = false;
    this.interviewStatusIds = MyAppHttpService.InterviewStatusIds;
    if (this.selectedTab = MyAppHttpService.Refferal.ASKFORREFERENCE.roleName) {
    
      this.getAllUsers( );
    } else {
      this.selectedTab = MyAppHttpService.Refferal.REFERALREQUESTS.roleName;
      this.getAllUsers();
    }
  }
  Tab1Selected() {
    console.log('Selected tab1');
    this.selectedTab = MyAppHttpService.Refferal.ASKFORREFERENCE.roleName;
    this.getAllUsers();
  }

  Tab2Selected() {
    console.log('Selected tab2');
    this.selectedTab = MyAppHttpService.Refferal.REFERALREQUESTS.roleName;
    this.getAllUsers();
   
  }

  onPageChanges(event) {
    this.paginationProps.currentPage = event;
    //this.interviewStatusIds = MyAppHttpService.InterviewStatusIds;
    this.getAllUsers();
  }


  //endPath 
  getAllUsers() {
    
    let inputData = { 
        "refferalType" :  this.selectedTab 
     } ;
     //calling service
    this.commonService.getAllUsers(inputData).subscribe(response => {
      console.log('interviews response: ', response);
      this.isDataLoaded = true;
      console.log('11111111111 response: ', response.userList);

        this.userList = response.userList;
        console.log('userList  : ', this.userList);

        this.userList.forEach(element =>{
          console.log('00000000000 ', element.name);
         element.intialName = this.getIntials(element.name);

        });
        console.log('555555555555  : ', this.userList);
        console.log('666666666666  : ', this.userList.length);
        //========== response code ================//
        if (response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
 
        }
  });
  
  }//e
getIntials(iName : string){
  let initials : string;
  const fullName = iName.split(' ');
  if(iName.indexOf(' ') >= 0){
     initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
  }
  else{
     initials = iName.charAt(0)+iName.charAt(1);
  }
return initials.toUpperCase();
}//getIntials


getRequest(referenceId : number){
  console.log('00000000000000000000  ' + referenceId );
  let dataforsending: any = {};
  dataforsending.header = 'Confirm';
  dataforsending.message = 'Do you really want to send Request?';
  dataforsending.button1 = 'Cancel';
  dataforsending.button2 = 'Confirm';
  let modalRef = this.modalService.open(AlertCompComponent);
  modalRef.componentInstance.data = { AlertData: dataforsending };
  modalRef.result.then((e) => {
    if (e == true) {
      console.log('Fired after Confirm' + referenceId );
      this.updateRefferalStatus(referenceId);
     
    }
  });
}//getRequest

updateRefferalStatus(referenceId : number) {
  let inputData = { 
      "referenceId" :  referenceId,
      "status":"Requested"
   } 
   //calling service
  this.commonService.updateReferalStatus(inputData).subscribe(response => {
    console.log('update response: ', response);
    this.isDataLoaded = true;
    if (response && response.statusCode == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Refferal request', 'Requested successfully');
      this.ngOnInit();
    }
});
}//update ref user




openDailog(){
  console.log(this.selectedTab.valueOf());
  const dailogconfig = new MatDialogConfig();
  dailogconfig.disableClose=true;
  dailogconfig.autoFocus = true;
  dailogconfig.width = "400px";
  dailogconfig.height = "370px"
  let addRef = this.dailog.open(AddrefferaluserComponent, dailogconfig);

  addRef.afterClosed().subscribe( result =>{
    
    console.log(`Dailog result : ${result}`);
    if (result == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
      console.log("if condition onInit......")
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Added Successfully', 'User Added Successfully');
      if(this.selectedTab.valueOf() == "ASK_FOR_REFERENCE"){
        this.ngOnInit();
      }
    }
   // this.dialogRef.close();
  });
}// added user

// -------------VIEW------------

openViewFeedbackDailog(referenceId : number) {
  console.log("--------view-------> ",referenceId);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "800px";
  dialogConfig.height = "530px";
  let inputData = { 
    "referenceId" :  referenceId
 } 
  this.commonService.viewreferalfeedback(inputData).subscribe(response => {
  if(response && response.domain){
    dialogConfig.data = {
      id: 1,
      title: response
  };
    let addRef = this.dailog.open(ViewfeedbackComponent, dialogConfig );
  }
}); 
}

// =========GIVE=============
openGiveFeedBackDailog(referenceId : number, intial :string, name : string, role : string){
  console.log("working button "+referenceId );
  const dailogconfig = new MatDialogConfig();
  dailogconfig.disableClose=true;
  dailogconfig.autoFocus = true;
  dailogconfig.width = "800px";
  dailogconfig.height = "585px"
  console.log('update response: ', dailogconfig);
  this.giveRefData = {
    refId : referenceId,
    refIntial : intial,
    refName : name,
    refrole : role
  }
  dailogconfig.data = {
   refId : this.giveRefData
  

};
  let addRef = this.dailog.open(GivefeedbackComponent, dailogconfig);
  addRef.afterClosed().subscribe( result =>{
    console.log(`Dailog result : ${result}`);
   // console.log("Dailog result 22222 : "+dataStorage.globalSkillsList);
    if (result == MyAppHttpService.RESPONSE_CODES.SUCCESS) {
      console.log("if condition onInit......")
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'Feedback given successfully', 'Given successfully');
      this.Tab2Selected();
    }
   // this.dialogRef.close();
  });
}//Giveend




onTabChange(event){
  if(event.nextId == 'tFirst'){
    console.log(event);
    console.log("1st tab");
   this.Tab1Selected();
  }
  else{
    this.Tab2Selected();
    console.log(event);
   console.log("2nd tab");
  }
}

}
