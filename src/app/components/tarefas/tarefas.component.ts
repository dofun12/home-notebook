import { Component } from '@angular/core';
import {TarefasService} from "../../services/tarefas.service";
import {TarefaDto} from "../../dto/tarefaDto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TarefaModalComponent} from "../../modal/tarefa-modal/tarefa-modal.component";

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss']
})
export class TarefasComponent {
  tarefas: TarefaDto[] = [];

  listTarefas(){
    this.tarefaService.getTarefas().subscribe(response=> {
      this.tarefas = response;
    });
  }

  constructor(private tarefaService: TarefasService, private modalService: NgbModal) {
    this.listTarefas();
  }

  abrirModalTarefa(){
    const modalRef = this.modalService.open(TarefaModalComponent)
    modalRef.closed.subscribe((response: TarefaDto) => {
      if(!response){
        return;
      }
      this.tarefaService.addTarefa(response).subscribe(response => {
        this.listTarefas();
      });
    });
  }

  deleteTarefa(tarefa: TarefaDto){
    this.tarefaService.deleteTarefa(tarefa.id).subscribe(response => {
      console.log(response);
      this.listTarefas();
    })
  }

  editTarefa(tarefa: TarefaDto){
    const modalRef = this.modalService.open(TarefaModalComponent)
    modalRef.componentInstance.tarefa = {...tarefa};
    modalRef.closed.subscribe((closeResponse: TarefaDto) => {
      if(!closeResponse || !closeResponse.id){
        return;
      }
      this.tarefaService.changeTarefa(tarefa.id,closeResponse).subscribe(response => {
        this.listTarefas();
      });
    });
  }

  changeButtonTarefa(tarefa: TarefaDto){
    tarefa.done = !tarefa.done;
    this.onchangeTarefa(tarefa);
  }

  onchangeTarefa(tarefa: TarefaDto){
    this.tarefaService.changeTarefa(tarefa.id, tarefa).subscribe(response => {
    });
  }

}
