import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Comment, Inf, Note} from "../../shared/note.model";
import {CommentsService} from "../../shared/comments.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LocalStorageService} from "../../shared/local-storage-service.service";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  comment: Comment = new Comment();
  comments: Comment[] = new Array<Comment>();

  @Input() saveType = Inf.saveType;
  @Input() opened = 0;
  @Input() noteId!: number;

  constructor(private service: CommentsService, private router: Router, private route: ActivatedRoute, private store: LocalStorageService) { }

  ngOnInit(): void {
    Inf.userName = this.store.getUser();
    this.comment.author = Inf.userName;

    this.route.params.subscribe((params: Params) => {
      if(params.id) {
        this.comment.noteId = params.id as number;
        this.opened = 1;
        this.noteId = params.id as number;
      }
    })
    this.comments = this.service.getAll();
  }

  onSubmit(form: NgForm) {
    this.comment.author = form.value.author;
    this.comment.content = form.value.content;

    Inf.userName = this.comment.author;
    this.store.saveUser(Inf.userName);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    let min: string = '00';
    if(minutes < 10) {
      min = '0'+minutes;
    }
    else min = ''+minutes;

    this.comment.created_at = dd + '.' + mm + '.' + yyyy + ' ' + hours + ':' + min;

    this.service.add(this.comment);

    this.comments = this.service.getAll();
  }

}
