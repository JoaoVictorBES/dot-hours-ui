import { Component } from '@angular/core';
import { UsuarioService } from '../../Services/usuario.service';
import { Atividade } from '../../Models/atividade';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../Models/usuario';
import { Projeto } from '../../Models/projeto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

  atividade: Atividade [] = [];

  usuario: Usuario = new Usuario(0, '', '', '', '', '', '', this.atividade);

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, router: Router) {}

  ngOnInit(): void {
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const idNumber = Number(id);
      this.usuarioService.findById(idNumber).subscribe({
        next: (usuario) => {
          this.usuario = usuario;
        },
        error: (error: any) => {
          console.error('Erro ao buscar usuario:', error);
        }
      });
    }
  }


}
