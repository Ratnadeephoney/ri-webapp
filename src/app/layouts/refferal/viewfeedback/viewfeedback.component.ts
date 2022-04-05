import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MyAppHttpService } from 'src/app/shared/service/my-app-http.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { DataStorageService } from 'src/app/shared/service/data-storage.service';


@Component({
  selector: 'app-viewfeedback',
  templateUrl: './viewfeedback.component.html',
  styleUrls: ['./viewfeedback.component.scss']
})
export class ViewfeedbackComponent implements OnInit {
  form: FormGroup;
  description: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ViewfeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.title;
  }
  ngOnInit() {
    console.log("------------>",this.description);
    console.log("------------>",this.description.name);

  }//ngOnit
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
