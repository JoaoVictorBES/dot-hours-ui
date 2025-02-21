import { Component, OnInit } from '@angular/core';
import { Projeto } from '../../Models/projeto';
import { ProjetoService } from '../../Services/projeto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent implements OnInit {


  projeto: Projeto | null = null;

  router: Router;

  constructor(private projetoService: ProjetoService, private route: ActivatedRoute, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    this.carregarProjeto();
  }

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
  

}




