import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtividadeService } from '../../../Services/atividade.service';
import { Atividade } from '../../../Models/atividade';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-atividades',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './listar-atividades.component.html',
  styleUrl: './listar-atividades.component.scss'
})
export class ListarAtividadesComponent implements OnInit {


  constructor(
      private atividadeService: AtividadeService
  ) {}

  atividades: Atividade[] = [];

  ngOnInit(): void {
    this.carregarAtividades();
  }

  carregarAtividades(): void {
    this.atividadeService.findAll().subscribe({
      next: (data) => {
        this.atividades = data;
      },
      error: (err) => console.error("Erro ao carregar atividades:", err)
    });
  }

  

}
