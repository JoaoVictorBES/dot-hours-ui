import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Projeto } from '../../../../Models/projeto';
import { Atividade } from '../../../../Models/atividade';
import { AtividadeService } from '../../../../Services/atividade.service';
import { ProjetoService } from '../../../../Services/projeto.service';

@Component({
  selector: 'app-listar-projetos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './listar-projetos.component.html',
  styleUrl: './listar-projetos.component.scss'
})
export class ListarProjetosComponent implements OnInit {

  projetos: Projeto[] = [];
  atividades: Atividade[] = [];

  constructor(
    private projetoService: ProjetoService,
    private atividadeService: AtividadeService
  ) {}

  ngOnInit(): void {
    this.carregarProjetos();
    this.carregarAtividades();
  }

  carregarProjetos(): void {
    this.projetoService.findAll().subscribe({
      next: (data) => {
        this.projetos = data;
      },
      error: (err) => console.error("Erro ao carregar projetos:", err)
    });
  }

  carregarAtividades(): void {
    this.atividadeService.getAtividades().subscribe({
      next: (data) => {
        this.atividades = data;
      },
      error: (err) => console.error("Erro ao carregar atividades:", err)
    });
  }

}
