import { Injectable } from '@angular/core';
import {Comment} from "./note.model";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentsFireStoreService {
  col_comments = 'comments';
  comments: Comment[] = new Array<Comment>();

  commentsColRe!: AngularFirestoreCollection<Comment>;
  arr: Observable<Comment[]> = new Observable<Comment[]>();
  subscription!: Subscription;

  constructor(private store: AngularFirestore) {
    this.commentsColRe = this.store.collection(this.col_comments);
    this.arr = this.commentsColRe.valueChanges();
  }

  public saveOne(comment: Comment, index: number) {
    this.store.collection(this.col_comments).doc(''+index).set(Object.assign({}, comment));
  }

  public changeOne(comment: Comment, index: number) {
    this.store.collection(this.col_comments).doc(''+index).update(Object.assign({}, comment));
  }

  public deleteOne(index: number) {
    this.store.collection(this.col_comments).doc(''+index).delete();
  }

  public getAll() {
    this.comments = new Array<Comment>();
    let was:boolean = false;
    this.subscription = this.arr.subscribe(value => {
      if(!was) {
        was = true;

        for (let i in value) {
          this.comments.push((value[i] as Comment));
        }
      }
    })
    return this.comments;
  }
}
