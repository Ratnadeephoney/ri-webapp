import { Injectable } from '@angular/core';
import { ConfigDB } from '../data/config';

@Injectable({
  providedIn: 'root'
})
export class CustomizerService {

  constructor() {
    var layoutVersion = localStorage.getItem("layoutVersion") || this.data.settings.layout_version 
    var layoutType = localStorage.getItem("layoutType") || this.data.settings.layout_type
      if (layoutVersion){
      document.body.classList.add(layoutVersion);
      this.data.settings.layout_version = layoutVersion }   
      if (layoutType)
      document.body.classList.add(layoutType);
  }

  // Configration Layout
  public data = ConfigDB.data

  // Set Customize layout Version
  setLayoutVersion(layout) {
    document.body.classList.remove(this.data.settings.layout_version);
    this.data.settings.layout_version = layout
    document.body.classList.add(layout);
    localStorage.setItem('layoutVersion', layout);
  }

  setLayoutType(layout) {    
    document.body.classList.remove(this.data.settings.layout_type);    
    this.data.settings.layout_type = layout
    document.body.classList.add(layout);
    localStorage.setItem('layoutType', layout);
  }

}
