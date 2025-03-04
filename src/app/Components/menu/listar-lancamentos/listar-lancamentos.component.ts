import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LancamentoHoras } from '../../../Models/lancamento-horas';
import { LancamentoHorasService } from '../../../Services/lancamento-horas.service';

@Component({
  selector: 'app-listar-lancamentos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './listar-lancamentos.component.html',
  styleUrl: './listar-lancamentos.component.scss'
})
export class ListarLancamentosComponent {

  constructor(
    private lancamentosHoraService: LancamentoHorasService
  ){}

  lancamentos : LancamentoHoras [] = [];

  ngOnInit(): void {
      this.carregarLancamentos();
    }
  
    carregarLancamentos(): void {
      this.lancamentosHoraService.findAll().subscribe({
        next: (lancamentos: LancamentoHoras[]) => {
          this.lancamentos = lancamentos;
        },
        error: (err: any) => console.error("Erro ao carregar atividades:", err)
      });
    }

}
