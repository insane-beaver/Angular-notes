import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Note, Inf} from "../../shared/note.model";
import {NotesService} from "../../shared/notes.service";
import { LocalStorageService } from "../../shared/local-storage-service.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  animations: [
    trigger('itemAnim',[
      //Entry
      transition("void => *",[
        //Init state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.8)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0
        }),
        //animate the spacing
        animate('100ms ease-in', style({
          height: '*',
          'margin-top': '*',

          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*'
        })),
        animate('200ms ease-out')
      ]),
      transition("* => void", [
        //scale up
        animate(50, style({
          transform: 'scale(1.1)'
        })),
        //scale back to normal
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        //scale down & fade out
        animate('120ms ease-out', style({
          transform: 'scale(0.65)',
          opacity: 0
        })),
        //animate the spacing
        animate('150ms ease-out', style({
          opacity: 0,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': 0
        }))
      ])

    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService, private store: LocalStorageService) { }

  ngOnInit(): void {
    Inf.saveType = this.store.getOptions();
    this.notes = this.notesService.getAll();
  }

  deleteNote(id: number) {
    this.notesService.delete(id);
  }

}
