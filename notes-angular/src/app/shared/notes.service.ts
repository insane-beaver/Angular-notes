import { Injectable } from '@angular/core';
import {Note} from "./note.model";
import {Inf} from "./note.model";
import {LocalStorageService} from "./local-storage-service.service";
import {FireStoreService} from "./fire-store.service";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();

  constructor(private localStorageService: LocalStorageService, private store: FireStoreService ) { }

  private rewriteAll() {
    if(Inf.saveType==0) {
      this.notes = this.localStorageService.getAll();
    } else {
      this.notes = this.store.getAll();
    }
  }

  private getMaxId() {
    let a=-1;
    for(let index in this.notes) {
      if(this.notes[index].id >= a) {
        a=this.notes[index].id;
      }
    }
    return a;
  }
  private getPosition(data:number) {
    let a=-1;
    for(let index in this.notes) {
      if (this.notes[index].id == data) {
        a = this.notes.indexOf(this.notes[index]);
      }
    }
    return a;
  }

  getAll() {
    this.rewriteAll();
    return this.notes;
  }

  get(id: number) {
    return this.notes[this.getPosition(id)];
  }

  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  add(note: Note) {
    note.id = this.getMaxId()+1;
    if(Inf.saveType==0) {
      this.localStorageService.saveOne(note);
      console.log("Saved local");
    } else {
      this.notes.push(note);
      this.store.saveOne(note, note.id);
      console.log("Saved in Firebase");
    }
  }

  update(id: number, title: string, body: string) {
    let note = this.notes[this.getPosition(id)];
    note.title = title;
    note.body = body;

    if(Inf.saveType==0) {
      this.localStorageService.rewriteAllInStorage(this.notes);
    } else {
      this.store.changeOne(note,id);
    }
  }

  delete(id: number) {
    this.notes.splice(this.getPosition(id), 1);
    if(Inf.saveType==0) {
      this.localStorageService.rewriteAllInStorage(this.notes);
    } else {
      this.store.deleteOne(id);
    }
  }
}
