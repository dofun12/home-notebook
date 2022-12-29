import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {TarefaDto} from "../dto/tarefaDto";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private http: HttpClient) { }

  public getTarefas(): Observable<TarefaDto[]>{
    return this.http.get<TarefaDto[]>(`${environment.API_HOST}/api/tarefas`)
  }

  public addTarefa(tarefa: any): Observable<TarefaDto>{
    return this.http.post<TarefaDto>(`${environment.API_HOST}/api/tarefas`, tarefa)
  }


  public changeTarefa(id: string| null, tarefa: any): Observable<TarefaDto>{
    if(!id){
      return of(tarefa);
    }
    return this.http.put<TarefaDto>(`${environment.API_HOST}/api/tarefas/${id}`, tarefa)
  }

  public deleteTarefa(id: string| null): Observable<any>{
    if(!id){
      return of({});
    }
    return this.http.delete<any>(`${environment.API_HOST}/api/tarefas/${id}`)
  }

}
