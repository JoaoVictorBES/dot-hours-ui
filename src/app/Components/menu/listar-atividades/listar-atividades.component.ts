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

  totalPages: number = 0;

  currentPage: number = 0;

  ngOnInit(): void {
    this.carregarAtividades();
    this.carregarProjetos();
  }

  carregarAtividades(page: number = 0): void {
    this.atividadeService.findAll(page).subscribe({
      next: (response) => {
        this.atividades = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
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

  proximaPagina(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.carregarAtividades(this.currentPage + 1);
    }
  }
  
  paginaAnterior(): void {
    if (this.currentPage > 0) {
      this.carregarAtividades(this.currentPage - 1);
    }
  }

}
