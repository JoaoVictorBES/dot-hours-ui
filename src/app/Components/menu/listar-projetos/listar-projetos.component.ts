import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Projeto } from '../../../Models/projeto';
import { Atividade } from '../../../Models/atividade';
import { AtividadeService } from '../../../Services/atividade.service';
import { ProjetoService } from '../../../Services/projeto.service';
import { SidebarComponentComponent } from "../../../Util/sidebar-component/sidebar-component.component";
import { StatusProjeto } from '../../../Enums/status-projeto.enum';
import { PrioridadeProjeto } from '../../../Enums/prioridade-projeto.enum';

@Component({
  selector: 'app-listar-projetos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
],
  templateUrl: './listar-projetos.component.html',
  styleUrl: './listar-projetos.component.scss'
})
export class ListarProjetosComponent implements OnInit {

    constructor(
      private projetoService: ProjetoService,
      private atividadeService: AtividadeService
    ) {}

    projetos: Projeto[] = [];
    atividades: Atividade[] = [];
    totalPages: number = 0;
    currentPage: number = 0;

    statusProjeto = Object.values(StatusProjeto)
    prioridadeProjeto = Object.values(PrioridadeProjeto)

    filtros = {
      nome: '',
      status: '',
      prioridade: '',
      dataInicio: ''
    };

    ngOnInit(): void {
      this.carregarProjetos();
      this.carregarAtividades();
    }

    carregarProjetos(page: number = 0): void {
      this.projetoService.findAll(page).subscribe({
        next: (response) => {
          this.projetos = response.content;
          this.totalPages = response.totalPages;
          this.currentPage = response.number;
        },
        error: (err) => console.error("Erro ao carregar lançamentos:", err)
      });
    }

    carregarAtividades(): void {
      this.atividadeService.findAll().subscribe({
        next: (data) => {
          this.atividades = data;
        },
        error: (err) => console.error("Erro ao carregar atividades:", err)
      });
    }

     aplicarFiltros(): void {
        this.projetoService.filtrarProjetos(this.filtros.nome, this.filtros.status, this.filtros.prioridade, this.filtros.dataInicio).subscribe({
          next: (projeto: Projeto[]) => this.projetos = projeto,
          error: (err: any) => console.error("Erro ao aplicar filtros:", err)
        });
      }

   /* limparFiltros(): void {
      this.termoPesquisa = '';
      this.statusSelecionado = null;
      this.prioridadeSelecionada = null;
      this.dataInicioSelecionada = null;
      this.carregarProjetos();
    }
*/

proximaPagina(): void {
  if (this.currentPage < this.totalPages - 1) {
    this.carregarProjetos(this.currentPage + 1);
  }
}

paginaAnterior(): void {
  if (this.currentPage > 0) {
    this.carregarProjetos(this.currentPage - 1);
  }
}
}
