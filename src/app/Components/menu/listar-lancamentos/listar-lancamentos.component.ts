import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LancamentoHoras } from '../../../Models/lancamento-horas';
import { LancamentoHorasService } from '../../../Services/lancamento-horas.service';
import { Atividade } from '../../../Models/atividade';
import { Projeto } from '../../../Models/projeto';
import { Usuario } from '../../../Models/usuario';
import { UsuarioService } from '../../../Services/usuario.service';
import { ProjetoService } from '../../../Services/projeto.service';
import { AtividadeService } from '../../../Services/atividade.service';

@Component({
  selector: 'app-listar-lancamentos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './listar-lancamentos.component.html',
  styleUrl: './listar-lancamentos.component.scss'
})
export class ListarLancamentosComponent {

  constructor(
    private lancamentosHorasService: LancamentoHorasService,
    private usuarioService: UsuarioService,
    private projetoService: ProjetoService,
    private atividadeService: AtividadeService
  ){}

  filtros = {
    searchTerm:  '',
    selectedUsuario:  '',
    selectedAtividade:  '',
    selectedProjeto:  '',
    selectedDate:  '',
  }
    

    lancamentos: LancamentoHoras[] = [];
    lancamentosFiltrados: LancamentoHoras[] = [];
    usuarios: Usuario[] = [];
    atividades: Atividade[] = [];
    projetos: Projeto[] = [];
    totalPages: number = 0;
    currentPage: number = 0;


  ngOnInit(): void {
      this.carregarLancamentos();
      this.carregarUsuarios();
      this.carregarAtividades();
      this.carregarProjetos();
    }
  
    carregarLancamentos(page: number = 0): void {
      this.lancamentosHorasService.findAll(page).subscribe({
        next: (response) => {
          this.lancamentos = response.content;
          this.totalPages = response.totalPages;
          this.currentPage = response.number;
        },
        error: (err) => console.error("Erro ao carregar lançamentos:", err)
      });
    }

    proximaPagina(): void {
      if (this.currentPage < this.totalPages - 1) {
        this.carregarLancamentos(this.currentPage + 1);
      }
    }
    
    paginaAnterior(): void {
      if (this.currentPage > 0) {
        this.carregarLancamentos(this.currentPage - 1);
      }
    }

    carregarUsuarios(): void {
      this.usuarioService.findAll().subscribe({
        next: (data) => {
          this.usuarios = data;
        },
        error: (err) => console.error("Erro ao carregar usuarios:", err)
      });
    }

  carregarAtividades(): void {
    this.atividadeService.findAll().subscribe({
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
    this.lancamentosHorasService.filtrarLancamentos(
      this.filtros.selectedUsuario,
      this.filtros.selectedAtividade,
      this.filtros.selectedProjeto,
      this.filtros.selectedDate
    ).subscribe({
      next: (lancamentos: LancamentoHoras[]) => this.lancamentos = lancamentos,
      error: (err: any) => console.error("Erro ao aplicar filtros:", err)
    });
  }

  

}
