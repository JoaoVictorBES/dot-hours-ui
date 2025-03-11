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

  carregarUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => console.error("Erro ao carregar usuarios:", err)
    });
  }

  carregarAtividades(): void {
    this.atividadeService.listAll().subscribe({
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

  
}
