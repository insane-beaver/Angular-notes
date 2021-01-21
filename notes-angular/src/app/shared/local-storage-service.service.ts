import {Inject, Injectable} from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {Note} from "./note.model";

let STORAGE_KEY = 'localNotesList';

@Injectable()
export class LocalStorageService {
  notesList: Note[] = new Array<Note>();
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  public saveOne(note: Note): void {
    this.notesList = this.storage.get(STORAGE_KEY);

    if (typeof this.notesList == 'undefined') { //array is undefined
      this.notesList = new Array<Note>();
    }
    this.notesList.push(note);

    this.storage.set(STORAGE_KEY, this.notesList);
  }

  public rewriteAllInStorage (notes: Note[]) {
    this.notesList = notes;
    this.storage.set(STORAGE_KEY, this.notesList);
  }

  public getAll() {
    console.log(this.storage);
    this.notesList = this.storage.get(STORAGE_KEY);
    return this.notesList;
  }
}
