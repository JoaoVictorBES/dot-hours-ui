import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../Models/usuario';
import { UsuarioService } from '../../../Services/usuario.service';
import { SidebarComponentComponent } from '../../../Util/sidebar-component/sidebar-component.component';
import { Atividade } from '../../../Models/atividade';
import { AtividadeService } from '../../../Services/atividade.service';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss'
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: Usuario [] = [];
  roles: string[] = ['ADMIN', 'USER']; 
  atividades: Atividade[] = [];
  totalPages: number = 0;
  currentPage: number = 0;

  filtros = {
    nome: '',
    role: '',
    atividade: '',
    ultimoLogin: ''
  };
  

  constructor(
    private usuarioService: UsuarioService,
    private atividadeService: AtividadeService
  ) {}


  ngOnInit(): void {
    this.carregarUsuarios();
    this.carregarAtividades();
  }

  carregarUsuarios(page: number = 0): void {
    this.usuarioService.findAll(page).subscribe({
      next: (response) => {
        this.usuarios = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
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

  filtrarUsuarios(): void {
    const params: any = { ...this.filtros };
    if (!params.role) delete params.role;
    if (!params.atividade) delete params.atividade;
    if (!params.ultimoLogin) delete params.ultimoLogin;

    this.usuarioService.findByFilters(params).subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error("Erro ao filtrar usuários:", err)
    });
  }

  proximaPagina(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.carregarUsuarios(this.currentPage + 1);
    }
  }
  
  paginaAnterior(): void {
    if (this.currentPage > 0) {
      this.carregarUsuarios(this.currentPage - 1);
    }
  }
  
}
