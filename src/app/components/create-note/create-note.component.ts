import { Component } from '@angular/core';
import {NoteService} from "../../services/note.service";
import {NoteDto} from "../../dto/note-dto";

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {
  constructor(private noteService: NoteService) {}
  note = new NoteDto();

  types =  ['simple', 'multi']

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  generateNewNote(){
    const letters = 'Q W E R T Y U I O P A S D F G H J K L Z X C V B N M 0 1 2 3 4 5 6 7 8 9 @ #'
    const arrayletters = letters.split(' ');
    let text = '';
    for(let i=0;i<6;i++){
      let selectedIndex = this.getRandomInt(arrayletters.length);
      text+=arrayletters[selectedIndex];
    }
    const newNote = new NoteDto();
    newNote.name = text;
    newNote.type = this.types[0];
    this.note = newNote;
  }

  createNewNote(){
    this.noteService.addNote(this.note).subscribe(response => {
      console.log('Saved', response);
    });
  }

}
