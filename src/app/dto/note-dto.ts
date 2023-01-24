import {PaperDto} from "./paper-dto";

export class NoteDto{
  name: string;
  type: string;
  papers: PaperDto[];

  constructor() {
    this.name = '';
    this.type = '';
    this.papers = [];
  }
}
