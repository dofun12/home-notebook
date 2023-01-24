import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../../services/note.service";
import {NoteDto} from "../../dto/note-dto";
import {PaperDto} from "../../dto/paper-dto";
import {v4 as uuidv4} from 'uuid';
@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent {
  note = new NoteDto();
  elementTypes = ['short-text', 'textarea'];



  constructor(private routeSelected: ActivatedRoute, private noteService: NoteService ) {
    this.routeSelected.params.subscribe(parameters => {
      console.log(parameters);
      this.noteService.getNotesByName(parameters['name']).subscribe( response => {
        if(!response.success){
          return;
        }
        this.note = response.data;
      })
    });
  }

  addPaper(){
    let paper = new PaperDto();
    paper.id = uuidv4();
    paper.elementType = this.elementTypes[0];
    this.note.papers.push(paper);
  }
}
