import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtividadeService } from '../../../Services/atividade.service';
import { Atividade } from '../../../Models/atividade';
import { RouterLink } from '@angular/router';
import { ProjetoService } from '../../../Services/projeto.service';
import { Projeto } from '../../../Models/projeto';
import { StatusAtividade } from '../../../Enums/status-atividade.enum';

@Component({
  selector: 'app-listar-atividades',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './listar-atividades.component.html',
  styleUrl: './listar-atividades.component.scss'
})
export class ListarAtividadesComponent implements OnInit {


  constructor(
      private atividadeService: AtividadeService,private projetoService: ProjetoService
  ) {}

  filtros = {
    nome: '',
    status: '',
    idProjeto: '',
    dataInicio: '',
    dataFim: ''
  };

  statusOptions = Object.values(StatusAtividade); 

  atividades: Atividade[] = [];

  projetos: Projeto[] = [];

  ngOnInit(): void {
    this.carregarAtividades();
    this.carregarProjetos();
  }

  carregarAtividades(): void {
    this.atividadeService.listAll().subscribe({
      next: (atividades: Atividade[]) => {
        this.atividades = atividades;
      },
      error: (err: any) => console.error("Erro ao carregar atividades:", err)
    });
  }

  carregarProjetos(): void {
    this.projetoService.findAll().subscribe({
      next: (data) => {
        this.projetos = data;
      },
      error: (err) => console.error("Erro ao carregar projetos:", err)
    });
  }

  aplicarFiltros(): void {
    this.atividadeService.filtrarAtividades(this.filtros).subscribe({
      next: (atividades: Atividade[]) => this.atividades = atividades,
      error: (err: any) => console.error("Erro ao aplicar filtros:", err)
    });
  }

}
