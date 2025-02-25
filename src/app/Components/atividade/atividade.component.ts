import { Component, OnInit } from '@angular/core';
import { Atividade } from '../../Models/atividade';
import { AtividadeService } from '../../Services/atividade.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-atividade',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './atividade.component.html',
  styleUrl: './atividade.component.scss'
})
export class AtividadeComponent implements OnInit {

  atividades: Atividade[] = [];

  atividade: Atividade | null = null;

  constructor(private atividadeService: AtividadeService, private route: ActivatedRoute, router: Router) {}

  ngOnInit(): void {
    this.carregarAtividade();
  }

  private carregarAtividade(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const idNumber = Number(id);
      this.atividadeService.findById(idNumber).subscribe({
        next: (data) => {
          this.atividade = data;
        },
        error: (error) => {
          console.error('Erro ao buscar projeto:', error);
        }
      });
    }
  }

}
