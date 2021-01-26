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

  deleteByNoteId(noteId: number) {
    for (var i = 0, len = this.comments.length; i < len; i++) {
      if(this.comments[i].noteId==noteId) {
        this.delete(this.comments[i].id);
      }
    }
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
