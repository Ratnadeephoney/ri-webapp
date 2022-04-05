import { map,startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';



interface Skills {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-givefeedback',
  templateUrl: './givefeedback.component.html',
  styleUrls: ['./givefeedback.component.scss']
})
export class GivefeedbackComponent implements OnInit {

  optionalTags : any = [];
  id : number;
  domainstarRating = 0; 
  technicalstarRating = 0;
  communicationstarRating = 0;
  attitudestarRating = 0;

  selectedSkills = [0];
  skillList: Skills[] = this.dataStorage.globalSkillsList;




  constructor(
    public dailogRef : MatDialogRef<GivefeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data : { refId : any},
    public commonService :CommonService,
    public dataStorage: DataStorageService
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  

  ngOnInit() {
     this.filteredOptions =this.myControl.valueChanges.pipe(
       startWith(''),
      map(value => this._filter(value))
     );

  }

  

  private _filter(value : string): any[]{
    console.log("------subject 6 ---> ",value);
    const filterValue=value.toLowerCase();
    return this.dataStorage.globalSkillsList.technologyDescription.filter(option =>
      option.toLowerCase().includes(filterValue));
     
     }

  myControl =new FormControl();
  filteredOptions : Observable<string[]>;

  skillsall =this.dataStorage.globalSkillsList.technologyDescription;

  onKey(value) { 
    console.log("------subject 2 ---> ",value);
    this.skillsall = this.search(value);
    }

    search(value: string) { 
      let filter = value.toLowerCase();
      return this.dataStorage.globalSkillsList.technologyDescription.filter(option => option.toLowerCase().startsWith(filter));
    }

    displayFn(subject){
      console.log("------subject 1 ---> ",subject);
     // console.log("------subject 1 ---> ",subject.technologyDescription);
      return subject ? subject : undefined;
     
    }
  

  giveFeedbackForm =new FormGroup({
    referenceId : new FormControl(this.data.refId.refId),
    domain : new FormControl('',Validators.required),
    technical : new FormControl('',Validators.required),
    communication : new FormControl('',Validators.required),
    attitude : new FormControl('',Validators.required),
    workAssociation : new FormControl('',Validators.required),
    project : new FormControl('',Validators.required),
    duration : new FormControl('',Validators.required),
    skills : new FormControl('',Validators.required),
    feedback : new FormControl('',Validators.required)
  });

  initializeRefFormGroup(){
    this.giveFeedbackForm.setValue({
      referenceId : '',
      domain :'',
      technical : '',
      communication : '',
      attitude : '',
      workAssociation :'',
      project : '',
      duration :'',
      skills : '',
      feedback :''
    });
  }

  onSubmit(){
    console.log(this.giveFeedbackForm.value);
   this.commonService.givereferencefeedback(this.giveFeedbackForm.value).subscribe(response => {
    this.giveFeedbackForm.reset();
    this.initializeRefFormGroup();
    if(response.statusCode === 409){
      this.commonService.showToast(MyAppHttpService.ToastType.SUCCESS, 'failed', 'feedback has not added');
    }
    else{
      this.onClose(response.statusCode);
    }
   });
    
  }//submit

  onClose(x : number){
    this.giveFeedbackForm.reset();
    this.initializeRefFormGroup();
    this.dailogRef.close(x);
  }
  
  close() {
    this.dailogRef.close();
  }


}
