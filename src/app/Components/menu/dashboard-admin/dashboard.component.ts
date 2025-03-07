import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Atividade } from '../../../Models/atividade';
import { Projeto } from '../../../Models/projeto';
import { ProjetoService } from '../../../Services/projeto.service';
import { AtividadeService } from '../../../Services/atividade.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private projetoService: ProjetoService, private atividadeService: AtividadeService) { }

  projetos: Projeto[] = [];

  atividades: Atividade[] = [];

  isCollapsed = false;

  ngOnInit(): void {
    // Chama o serviço para buscar os projetos ao inicializar o componente
    this.projetoService.findAll().subscribe(
      (dados) => {
        this.projetos = dados;  // Armazena os dados retornados na variável projetos
      },
      (erro) => {
        console.error('Erro ao carregar projetos:', erro);
      }
    );

    // Carregar as atividades
    this.atividadeService.listAll().subscribe(
      (dados) => {
        this.atividades = dados;  // Armazenando as atividades
      },
      (erro) => {
        console.error('Erro ao carregar atividades:', erro);
      }
    );
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
