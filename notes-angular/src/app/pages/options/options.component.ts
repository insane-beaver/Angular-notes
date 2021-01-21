import { Component, OnInit } from '@angular/core';
import {Inf} from "../../shared/note.model";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  switchText = "Save in localStorage ";
  option = false;


  constructor() { }

  ngOnInit(): void {
    if(Inf.saveType==0) {
      this.option = false;
      this.switchText = "Save in localStorage";
    } else {
      this.option = true;
      this.switchText = "Save in Firebase";
    }
  }

  clickSwitch() {
    if(!this.option) {
      Inf.saveType =1;
      this.option = true;
      this.switchText = "Save in Firebase";
    } else {
      Inf.saveType =0;
      this.option = false;
      this.switchText = "Save in localStorage";
    }
  }

}
