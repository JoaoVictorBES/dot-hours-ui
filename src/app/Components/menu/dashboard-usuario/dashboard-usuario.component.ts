import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Atividade } from '../../../Models/atividade';
import { Projeto } from '../../../Models/projeto';
import { AtividadeService } from '../../../Services/atividade.service';
import { ProjetoService } from '../../../Services/projeto.service';
import { AuthService } from '../../../Auth/auth.service';

@Component({
  selector: 'app-dashboard-usuario',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './dashboard-usuario.component.html',
  styleUrl: './dashboard-usuario.component.scss'
})
export class DashboardUsuarioComponent {

  constructor(private projetoService: ProjetoService, private atividadeService: AtividadeService, private authService: AuthService) { }
  
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
      this.atividadeService.findAll().subscribe(
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

    logout() {
      this.authService.logout();
    }

}
