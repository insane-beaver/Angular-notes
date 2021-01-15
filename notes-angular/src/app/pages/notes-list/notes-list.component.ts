import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  /*@ViewChild('truncator') truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText: ElementRef<HTMLElement>;*/

  @ViewChild('truncator') truncator = document.getElementById('truncator');
  @ViewChild('bodyText') bodyText = document.getElementById('bodyText');

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // @ts-ignore
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);

    // @ts-ignore
    if(this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      // @ts-ignore
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block'); //no overflow
    } else {
      // @ts-ignore
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none'); //overflow
    }

  }

}
