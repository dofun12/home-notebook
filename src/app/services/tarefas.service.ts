import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {TarefaDto} from "../dto/tarefaDto";

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private http: HttpClient) { }

  public getTarefas(): Observable<TarefaDto[]>{
    return this.http.get<TarefaDto[]>("http://localhost:8000/api/tarefas")
  }

  public addTarefa(tarefa: any): Observable<TarefaDto>{
    return this.http.post<TarefaDto>("http://localhost:8000/api/tarefas", tarefa)
  }


  public changeTarefa(id: string| null, tarefa: any): Observable<TarefaDto>{
    if(!id){
      return of(tarefa);
    }
    return this.http.put<TarefaDto>(`http://localhost:8000/api/tarefas/${id}`, tarefa)
  }

  public deleteTarefa(id: string| null): Observable<any>{
    if(!id){
      return of({});
    }
    return this.http.delete<any>(`http://localhost:8000/api/tarefas/${id}`)
  }

}
