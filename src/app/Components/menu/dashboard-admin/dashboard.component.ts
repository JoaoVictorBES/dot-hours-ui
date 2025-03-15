import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Atividade } from '../../../Models/atividade';
import { Projeto } from '../../../Models/projeto';
import { ProjetoService } from '../../../Services/projeto.service';
import { AtividadeService } from '../../../Services/atividade.service';
import { AuthService } from '../../../Auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private projetoService: ProjetoService, private atividadeService: AtividadeService, private authService: AuthService) { }

  projetos: Projeto[] = [];

  atividades: Atividade[] = [];

  isAdmin: boolean = false;

  ngOnInit(): void {

    this.verificarPermissao();
    // Chama o serviço para buscar os projetos ao inicializar o componente
    this.projetoService.findAll().subscribe(
      (dados: any) => {

          this.projetos = dados.content; // Ajuste conforme a estrutura real
    
      },
      (erro) => {
        console.error('Erro ao carregar projetos:', erro);
      }
    );

    // Carregar as atividades
    this.atividadeService.findAll().subscribe(
      (dados) => {
        this.atividades = dados.content;  // Armazenando as atividades
      },
      (erro) => {
        console.error('Erro ao carregar atividades:', erro);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

  verificarPermissao(): void {
    const usuario = this.authService.getUserRole(); 
    this.isAdmin =  usuario === 'ROLE_ADMIN';

  }

}
