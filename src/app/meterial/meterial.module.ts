import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { MatDialogModule  } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



const material =[
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
  BrowserModule,
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatIconModule,
  MatGridListModule,
  MatSelectModule,
  MatAutocompleteModule
];

@NgModule({
 // declarations: [],
  imports: [material
   // CommonModule
  ],
  exports : [material]
})
export class MeterialModule { }
