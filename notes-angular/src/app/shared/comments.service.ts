import { Injectable } from '@angular/core';
import {Inf, Comment} from "./note.model";
import { CommentsFireStoreService } from "./comments-fire-store.service";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  comments: Comment[] = new Array<Comment>();

  constructor(private store: CommentsFireStoreService ) { }

  private rewriteAll() {
    this.comments = this.store.getAll();
  }

  private getMaxId() {
    let a=-1;
    for(let index in this.comments) {
      if(this.comments[index].id >= a) {
        a=this.comments[index].id;
      }
    }
    return a;
  }
  private getPosition(data:number) {
    let a=-1;
    for(let index in this.comments) {
      if (this.comments[index].id == data) {
        a = this.comments.indexOf(this.comments[index]);
      }
    }
    return a;
  }

  getAll() {
    this.rewriteAll();
    return this.comments;
  }

  get(id: number) {
    return this.comments[this.getPosition(id)];
  }

  getId(comment: Comment) {
    return this.comments.indexOf(comment);
  }

  add(comment: Comment) {
    comment.id = this.getMaxId() + 1;
    this.comments.push(comment);
    this.store.saveOne(comment, comment.id);
  }

  /*update(id: number, title: string, body: string) {
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
  }*/
}
