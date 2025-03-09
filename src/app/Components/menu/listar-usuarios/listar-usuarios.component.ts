import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../Models/usuario';
import { UsuarioService } from '../../../Services/usuario.service';
import { SidebarComponentComponent } from '../../../Util/sidebar-component/sidebar-component.component';

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

  

  constructor(
    private usuarioService: UsuarioService
  ) {}


  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => console.error("Erro ao carregar usuarios:", err)
    });
  }

}
