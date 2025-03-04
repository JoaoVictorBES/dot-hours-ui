import { Component } from '@angular/core';
import { Usuario } from '../../../Models/usuario';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../Services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent {

  usuario: Usuario | null = null;

  router: Router;
  ngOnInit(): void {
    this.carregarUsuario();
  }

  constructor(router: Router, private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.router = router;
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

  deletarUsuario(id: number | undefined | null): void {
    if (!id) {
      console.error('ID do usuario é inválido.');
      return;
    }
  
    const confirmar = confirm('Tem certeza que deseja excluir este usuário?');
    
    if (confirmar) {
      this.usuarioService.delete(id).subscribe({
        next: () => {
          alert('Usuário deletado com sucesso!');
          this.router.navigate(['/listar/usuarios']);
        },
        error: (error) => {
          console.error('Erro ao deletar usuário:', error);
          alert('Erro ao tentar excluir o usuário.');
        }
      });
    }
  }

  editarUsuario(): void {
    if (!this.usuario || !this.usuario.id) {
      console.error('Usuário inválido para edição.');
      return;
    }
  
    const confirmar = confirm('Tem certeza que deseja editar este usuário?');
  
    if (confirmar) {
      this.usuarioService.update(this.usuario.id, this.usuario).subscribe({
        next: () => {
          alert('Usuário editado com sucesso!');
          this.router.navigate(['/listar/usuarios']); // Navegação correta
        },
        error: (error) => {
          console.error('Erro ao editar usuario:', error);
          alert('Erro ao tentar editar o usuário.');
        }
      });
    }
  }

}
