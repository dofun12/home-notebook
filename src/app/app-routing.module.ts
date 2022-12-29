import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {TarefasComponent} from "./components/tarefas/tarefas.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'tarefas', component: TarefasComponent},
  {path: '', redirectTo: '/tarefas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
