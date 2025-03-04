import { Component } from '@angular/core';
import { Atividade } from '../../../Models/atividade';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusAtividade } from '../../../Enums/status-atividade.enum';
import { AtividadeService } from '../../../Services/atividade.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../Models/usuario';

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
      statusOptions = Object.values(StatusAtividade); // Pega os valores do enum StatusAtividade
      usuarios: Usuario[] =[];
      
      
      constructor(private atividadeService: AtividadeService, private route: ActivatedRoute, router: Router) {
        this.router = router;
      }
    
      ngOnInit(): void {
        this.carregarAtividade();
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
      

}
