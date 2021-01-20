import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  switchData = false;
  switchText = "Save in localStorage ";

  constructor() { }

  ngOnInit(): void {
  }

  clickSwitch() {
    if(!this.switchData) {
      this.switchData = true;
      this.switchText = "Save in Firebase";
    } else {
      this.switchData = false;
      this.switchText = "Save in localStorage";
    }

    console.log(this.switchData);
  }

}
