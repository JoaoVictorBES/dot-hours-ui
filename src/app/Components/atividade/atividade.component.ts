import { Component, OnInit } from '@angular/core';
import { Atividade } from '../../Models/atividade';
import { AtividadeService } from '../../Services/atividade.service';

@Component({
  selector: 'app-atividade',
  standalone: true,
  imports: [],
  templateUrl: './atividade.component.html',
  styleUrl: './atividade.component.scss'
})
export class AtividadeComponent implements OnInit {

  atividades: Atividade[] = [];

  constructor(private atividadeService: AtividadeService) {}

  ngOnInit(): void {
    this.atividadeService.getAtividades().subscribe(data => {
      this.atividades = data;
    });
  }

}
