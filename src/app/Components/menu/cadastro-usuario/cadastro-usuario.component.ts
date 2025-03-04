import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { Login } from '../../../Models/Login';
import { Usuario } from '../../../Models/usuario';
import { UsuarioService } from '../../../Services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent {

  router = inject(Router);
  UsuarioService = inject(UsuarioService);
  usuario: Usuario = new Usuario(null, '', '', '', '', '', '');
  login: Login = new Login();

  ngOnInit(): void {

  }

  cadastrar(): void{

      this.UsuarioService.create(this.usuario).subscribe({
        next: (response) => {
          console.log('Usuário cadastrado com sucesso:', response);
          this.router.navigate(['/listar/usuarios']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar usuário:', err);
          alert('Falha no cadastro! Tente novamente.');
        }
      })

  }

}
