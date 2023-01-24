import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {TarefasComponent} from "./components/tarefas/tarefas.component";
import {CreateNoteComponent} from "./components/create-note/create-note.component";
import {EditNoteComponent} from "./components/edit-note/edit-note.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'tarefas', component: TarefasComponent},
  {path: 'note/new', component: CreateNoteComponent},
  {path: 'note/edit/:name', component: EditNoteComponent},
  {path: '', redirectTo: '/tarefas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
