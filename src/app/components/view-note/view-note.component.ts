import { Component } from '@angular/core';
import {NoteService} from "../../services/note.service";
import {ActivatedRoute} from "@angular/router";
import {NoteDto} from "../../dto/note-dto";

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss']
})
export class ViewNoteComponent {
  note = new NoteDto();

  constructor(private routeSelected: ActivatedRoute, private noteService: NoteService) {
    this.routeSelected.params.subscribe(parameters => {
      console.log(parameters);
      this.noteService.getNotesByName(parameters['name']).subscribe( response => {
        if(!response.success){
          return;
        }
        this.note = response.data;
      });
    });
  }
}
