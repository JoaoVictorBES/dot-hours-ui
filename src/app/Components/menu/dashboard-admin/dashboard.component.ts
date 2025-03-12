import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Atividade } from '../../../Models/atividade';
import { Projeto } from '../../../Models/projeto';
import { ProjetoService } from '../../../Services/projeto.service';
import { AtividadeService } from '../../../Services/atividade.service';
import { AuthService } from '../../../Auth/auth.service';

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

  constructor(private projetoService: ProjetoService, private atividadeService: AtividadeService, private authService: AuthService) { }

  projetos: Projeto[] = [];

  atividades: Atividade[] = [];

  isCollapsed = false;

  ngOnInit(): void {
    // Chama o serviço para buscar os projetos ao inicializar o componente
    this.projetoService.findAll().subscribe(
      (dados: any) => {
        
        console.log('Dados retornados', dados)
          this.projetos = dados.content; // Ajuste conforme a estrutura real
    
      },
      (erro) => {
        console.error('Erro ao carregar projetos:', erro);
      }
    );

    // Carregar as atividades
    this.atividadeService.findAll().subscribe(
      (dados) => {
        console.log('dados', dados)
        this.atividades = dados.content;  // Armazenando as atividades
      },
      (erro) => {
        console.error('Erro ao carregar atividades:', erro);
      }
    );
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logout();
  }

}
