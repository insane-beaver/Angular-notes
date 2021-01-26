import { Component, OnInit } from '@angular/core';
import {Inf} from "../../shared/note.model";
import {Router} from "@angular/router";
import { LocalStorageService } from "../../shared/local-storage-service.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  switchText = "Save in localStorage ";
  option = false;

  saveState: number = 0;

  user:string = '';


  constructor(private router: Router, private store: LocalStorageService) { }

  ngOnInit(): void {
    Inf.userName = this.store.getUser();
    this.user = Inf.userName;

    Inf.saveType = this.store.getOptions();
    this.saveState = Inf.saveType;
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

  onSubmit(form: NgForm) {
    this.store.saveOptions(this.saveState);
    Inf.saveType = this.store.getOptions();

    this.user = form.value.user;
    Inf.userName = this.user;
    this.store.saveUser(Inf.userName);

    this.router.navigateByUrl('/');
  }

}
