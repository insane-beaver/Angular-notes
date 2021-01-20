import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Note} from "../../shared/note.model";
import {NotesService} from "../../shared/notes.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  note!: Note;
  noteId!: number;
  isNewNote = true;

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.note = new Note();
      if(params.id) {
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.isNewNote = false;
      } else {
        this.isNewNote = true;
      }
    })
  }

  onSubmit(form: NgForm) {
    if(this.isNewNote) {
      //save note
      this.note.title = form.value.title;
      this.note.body = form.value.body;
      this.notesService.add(this.note);
    } else {
      //update note
      this.notesService.update(this.noteId, form.value.title, form.value.body);
    }

    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}
