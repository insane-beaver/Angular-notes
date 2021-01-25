import { Component, OnInit } from '@angular/core';
import {Inf} from "../../shared/note.model";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
      Inf.touchScreen = 1;
    }else {
      Inf.touchScreen = 0;
    }
  }

}
