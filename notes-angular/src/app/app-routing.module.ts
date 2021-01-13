import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotesListComponent} from "./pages/notes-list/notes-list.component";
import {MainLayoutComponent} from "./pages/main-layout/main-layout.component";
import {OptionsComponent} from "./pages/options/options.component";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      { path: '', component: NotesListComponent },
      { path: 'options', component: OptionsComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
