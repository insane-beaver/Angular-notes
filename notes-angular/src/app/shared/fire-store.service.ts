import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Note} from "./note.model";
import {map} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  col_notes = 'notes';
  notes: Note[] = new Array<Note>();

  notesColRe!: AngularFirestoreCollection<Note>;
  arr: Observable<Note[]> = new Observable<Note[]>();
  subscription!: Subscription;

  constructor(private store: AngularFirestore) {
    this.notesColRe = this.store.collection(this.col_notes);
    this.arr = this.notesColRe.valueChanges();
  }

  public saveOne(note: Note, index: number) {
    this.store.collection(this.col_notes).doc(''+index).set(Object.assign({}, note));
  }

  public changeOne(note: Note, index: number) {
    this.store.collection(this.col_notes).doc(''+index).update(Object.assign({}, note));
  }

  public deleteOne(index: number) {
    this.store.collection(this.col_notes).doc(''+index).delete();
  }

  public getAll() {
    this.notes = new Array<Note>();
    let was:boolean = false;
    this.subscription = this.arr.subscribe(value => {
      if(!was) {
        was = true;

        for (let i in value) {
          this.notes.push((value[i] as Note));
        }
      }
    })
    return this.notes;
  }
}
