import {Injectable} from '@angular/core';
import {NoteDto} from "../dto/note-dto";
import {of} from "rxjs";
import {ResponseDto} from "../dto/response-dto";
import {HttpClient} from "@angular/common/http";
import {TarefaDto} from "../dto/tarefaDto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: NoteDto[] = [];

  constructor(private http: HttpClient) {
  }

  public getNotes() {
    return of(new ResponseDto(this.notes, true));
  }

  public getNotesByNameOld(name: string) {
    for (let note of this.notes) {
      if (name !== note.name) {
        continue;
      }
      return of(new ResponseDto(note, true));
    }
    return of(new ResponseDto(new NoteDto()));
  }

  public getNotesByName(name: string){
    return this.http.get<ResponseDto<NoteDto>>(`${environment.API_HOST}/api/notes/${name}`)
  }

  public saveOld(noteToSave: NoteDto) {
    let i = 0;
    for (let note of this.notes) {
      if (note.name === noteToSave.name) {
        this.notes[i] = noteToSave;
        return of(new ResponseDto(this.notes[i], true));
      }
      i++;
    }
    return of(new ResponseDto(new NoteDto()));
  }

  public save(noteToSave: NoteDto) {
    return this.http.put<ResponseDto<NoteDto>>(`${environment.API_HOST}/api/notes/${noteToSave.name}`, noteToSave)
  }

  public addNoteOld(note: NoteDto) {
    return of(new ResponseDto(this.notes.push(note), true));
  }

  public addNote(noteToSave: NoteDto) {
    return this.http.post<ResponseDto<NoteDto>>(`${environment.API_HOST}/api/notes`, noteToSave)
  }
}
