import { Component, OnInit } from '@angular/core';
import {Inf} from "../../shared/note.model";
import {Router} from "@angular/router";
import { LocalStorageService } from "../../shared/local-storage-service.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  switchText = "Save in localStorage ";
  option = false;

  saveState: number = 0;


  constructor(private router: Router, private store: LocalStorageService) { }

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
      this.saveState = 1;
      this.option = true;
      this.switchText = "Save in Firebase";
    } else {
      this.saveState = 0;
      this.option = false;
      this.switchText = "Save in localStorage";
    }
  }

  apply() {
    this.store.saveOptions(this.saveState);
    Inf.saveType = this.store.getOptions();

    this.router.navigateByUrl('/');
  }

}
