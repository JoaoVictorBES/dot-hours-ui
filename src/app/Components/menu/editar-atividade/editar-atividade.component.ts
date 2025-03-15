import { Component } from '@angular/core';
import { Atividade } from '../../../Models/atividade';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusAtividade } from '../../../Enums/status-atividade.enum';
import { AtividadeService } from '../../../Services/atividade.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../Models/usuario';
import { UsuarioService } from '../../../Services/usuario.service';

@Component({
  selector: 'app-editar-atividade',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './editar-atividade.component.html',
  styleUrl: './editar-atividade.component.scss'
})
export class EditarAtividadeComponent {

      projeto: Atividade | null = null;
      router: Router;
      atividade!: Atividade;
      statusOptions = Object.values(StatusAtividade); 
      usuarios: Usuario[] =[];
      usuariosNomesVinculados: string[] = []; 
      selectedUsuarios: number[] = []; 
      usuariosSelecionados: any[] = []; 
      
      constructor(private atividadeService: AtividadeService, private route: ActivatedRoute, router: Router, private usuarioService: UsuarioService) {
        this.router = router;
      }
    
      ngOnInit(): void {
        this.carregarAtividade();
        this.carregarUsuarios();
      }
  
      onUsuariosChange() {
        // Para cada ID selecionado, adicione o usuário completo na lista se ele não estiver já na lista
        this.selectedUsuarios.forEach(id => {
          const usuario = this.usuarios.find(u => u.id === id);
          if (usuario && !this.usuariosSelecionados.some(u => u.id === usuario.id)) {
            this.usuariosSelecionados.push(usuario);
          }
        });
    
        // Atualiza o idUsuariosVinculados na atividade
        this.atividade.idUsuariosVinculados = this.usuariosSelecionados.map(usuario => usuario.id);
    
        // Loga os dados dos usuários selecionados
        console.log('Usuarios selecionados:', this.usuariosSelecionados);
      }
      
    
      private carregarAtividade(): void {
        const id = this.route.snapshot.paramMap.get('id');
        
        if (id) {
          const idNumber = Number(id);
          this.atividadeService.findById(idNumber).subscribe({
            next: (atividade) => {
              this.atividade = atividade;
              this.atividade.dataInicio = new Date(this.atividade.dataInicio).toISOString().split('T')[0];
            },
            error: (error) => {
              console.error('Erro ao buscar atividade:', error);
            }
          });
        }
      }

      carregarUsuarios(): void {
    
        this.usuarioService.listAll().subscribe(
          (usuarios: Usuario[]) => {
          
            console.log('Usuários carregados:', usuarios);
            this.usuarios = usuarios;
          },
          (erro: any) => {
            console.error('Erro ao carregar usuarios', erro);
          }
        )
      }
    
    
      deletarAtividade(id: number | undefined): void {
        if (!id) {
          console.error('ID da atividade é inválido.');
          return;
        }
      
        const confirmar = confirm('Tem certeza que deseja excluir esta atividade?');
        
        if (confirmar) {
          this.atividadeService.delete(id).subscribe({
            next: () => {
              alert('Atividade deletada com sucesso!');
              this.router.navigate(['/listar/atividades']);
            },
            error: (error) => {
              console.error('Erro ao deletar atividade:', error);
              alert('Erro ao tentar excluir o atividade.');
            }
          });
        }
      }
  
      editarAtividade(): void {
        if (!this.atividade || !this.atividade.id) {
          console.error('Atividade inválido para edição.');
          return;
        }
      
        const confirmar = confirm('Tem certeza que deseja editar esta atividade?');
      
        if (confirmar) {
          this.atividadeService.update(this.atividade.id, this.atividade).subscribe({
            next: () => {
              alert('Atividade editada com sucesso!');
              this.router.navigate(['/listar/atividades']); // Navegação correta
            },
            error: (error) => {
              console.error('Erro ao editar projeto:', error);
              alert('Erro ao tentar editar o projeto.');
            }
          });
        }
      }

      toggleAtivo(): void {
        if (!this.atividade || !this.atividade.id) {
          console.error('Atividade inválida.');
          return;
        }
      
        this.atividadeService.toggleAtivo(this.atividade.id).subscribe({
          next: () => {
            this.atividade.ativo = !this.atividade.ativo; // Atualiza a UI
            alert(`Atividade ${this.atividade.ativo ? 'ativada' : 'desativada'} com sucesso!`);
          },
          error: (error) => {
            console.error('Erro ao alterar status da atividade:', error);
            alert('Erro ao tentar alterar status da atividade.');
          }
        });
      }
      
      
      removerUsuario(usuario: any) {
        // Remove o usuário da lista de usuários selecionados
        this.usuariosSelecionados = this.usuariosSelecionados.filter(u => u.id !== usuario.id);
    
        // Atualiza o selectedUsuarios, removendo o ID do usuário removido
        this.selectedUsuarios = this.selectedUsuarios.filter(id => id !== usuario.id);
    
        // Loga a lista de usuários selecionados
        console.log('Usuarios após remoção:', this.usuariosSelecionados);
      }
      
      

}
