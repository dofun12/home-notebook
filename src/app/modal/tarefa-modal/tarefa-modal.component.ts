import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TarefaDto} from "../../dto/tarefaDto";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-tarefa-modal',
  templateUrl: './tarefa-modal.component.html',
  styleUrls: ['./tarefa-modal.component.scss']
})
export class TarefaModalComponent {
  @Input() tarefa: TarefaDto = {name: '', done: false, id: null, description: null};

  constructor(public activeModal: NgbActiveModal) {}

  close(){
    this.activeModal.close({});
  }

  save(){
    this.activeModal.close(this.tarefa);
  }
}
