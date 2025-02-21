import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto } from '../../../Models/projeto';
import { ProjetoService } from '../../../Services/projeto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrioridadeProjeto } from '../../../Enums/prioridade-projeto.enum';
import { StatusProjeto } from '../../../Enums/status-projeto.enum';

@Component({
  selector: 'app-editar-projeto',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './editar-projeto.component.html',
  styleUrl: './editar-projeto.component.scss'
})
export class EditarProjetoComponent {

  projeto: Projeto | null = null;
  
    router: Router;
  
    constructor(private projetoService: ProjetoService, private route: ActivatedRoute, router: Router) {
      this.router = router;
    }
  
    ngOnInit(): void {
      this.carregarProjeto();
    }


    statusOptions = Object.values(StatusProjeto); 
    prioridadeOptions = Object.values(PrioridadeProjeto);

  
    private carregarProjeto(): void {
      const id = this.route.snapshot.paramMap.get('id');
      
      if (id) {
        const idNumber = Number(id);
        this.projetoService.findById(idNumber).subscribe({
          next: (data) => {
            this.projeto = data;
          },
          error: (error) => {
            console.error('Erro ao buscar projeto:', error);
          }
        });
      }
    }
  
  
    deletarProjeto(id: number | undefined): void {
      if (!id) {
        console.error('ID do projeto é inválido.');
        return;
      }
    
      const confirmar = confirm('Tem certeza que deseja excluir este projeto?');
      
      if (confirmar) {
        this.projetoService.delete(id).subscribe({
          next: () => {
            alert('Projeto deletado com sucesso!');
            this.router.navigate(['/dashboard/admin']);
          },
          error: (error) => {
            console.error('Erro ao deletar projeto:', error);
            alert('Erro ao tentar excluir o projeto.');
          }
        });
      }
    }

    editarProjeto(): void {
      if (!this.projeto || !this.projeto.id) {
        console.error('Projeto inválido para edição.');
        return;
      }
    
      const confirmar = confirm('Tem certeza que deseja editar este projeto?');
    
      if (confirmar) {
        this.projetoService.update(this.projeto.id, this.projeto).subscribe({
          next: () => {
            alert('Projeto editado com sucesso!');
            this.router.navigate(['/listar/projetos']); // Navegação correta
          },
          error: (error) => {
            console.error('Erro ao editar projeto:', error);
            alert('Erro ao tentar editar o projeto.');
          }
        });
      }
    }
    
}
