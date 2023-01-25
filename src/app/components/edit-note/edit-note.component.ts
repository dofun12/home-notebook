import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  elementTypes = ['short-text', 'textarea', 'html', 'image-url',  'big-title', 'title', 'small-title'];

  isOnGroup(element: string, list: string[]){
    for(const item of list){
      if(element !== item){
        continue;
      }
      console.log('foi')
      return true;
    }
    console.log('nao foi')
    return false;
  }

  constructor(private routeSelected: ActivatedRoute, private noteService: NoteService, private router: Router) {
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

  removePaper(element: PaperDto){
    const tempArray = [];
    for(let paper of this.note.papers){
      if(paper.id === element.id){
        continue;
      }
      tempArray.push(paper);
    }
    this.note.papers = tempArray;
  }

  save(){
    this.noteService.save(this.note).subscribe(response => {
      if(!response.success){
        return;
      }

      console.log(response);
      this.router.navigate(['note/view/', this.note.name])
    });
  }

  addPaper(){
    let paper = new PaperDto();
    paper.id = uuidv4();
    paper.elementType = this.elementTypes[0];
    this.note.papers.push(paper);
  }
}
