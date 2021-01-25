import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { OptionsComponent } from './pages/options/options.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import {StorageServiceModule} from "ngx-webstorage-service";
import {LocalStorageService} from "./shared/local-storage-service.service";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import {environment} from "../environments/environment";
import { CommentsListComponent } from './comments/comments-list/comments-list.component';
import { SingleCommentComponent } from './comments/single-comment/single-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    MainLayoutComponent,
    OptionsComponent,
    NoteCardComponent,
    NoteDetailsComponent,
    CommentsListComponent,
    SingleCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    StorageServiceModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule

  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
