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

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const idNumber = Number(id);
  
      // Verifique se está no ambiente de navegador
      if (typeof window !== 'undefined' && window.localStorage) {
        // Aqui você pode acessar o localStorage sem problemas
        const usuarioData = localStorage.getItem('usuario'); // Exemplo de acesso ao localStorage
      }
  
      // Buscar dados do usuário
      this.usuarioService.findById(idNumber).subscribe({
        next: (usuario) => {
          this.usuario = usuario;
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
        }
      });
  
      // Buscar atividades vinculadas ao usuário
      this.usuarioService.findAtividadesByUsuario(idNumber).subscribe({
        next: (atividades) => {
          this.usuario.atividades = atividades;
        },
        error: (error) => {
          console.error('Erro ao buscar atividades:', error);
        }
      });
    }
  }
  
  

  voltar(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const rotaDestino = usuario.role === 'admin' ? '/dashboard/admin' : '/dashboard/usuario';

    this.router.navigate([rotaDestino]);
  }

}
