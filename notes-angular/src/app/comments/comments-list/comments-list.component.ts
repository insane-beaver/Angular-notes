import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Comment, Inf, Note} from "../../shared/note.model";
import {CommentsService} from "../../shared/comments.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

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

  constructor(private service: CommentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    this.comment.created_at = dd + '.' + mm + '.' + yyyy;

    this.service.add(this.comment);

    this.comments = this.service.getAll();
  }

}
