import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LancamentoHorasService } from '../../Services/lancamento-horas.service';
import { AuthService } from '../../Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AtividadeService } from '../../Services/atividade.service';
import { LancamentoHoras } from '../../Models/lancamento-horas';
import { Atividade } from '../../Models/atividade';

@Component({
  selector: 'app-lancamento-horas',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './lancamento-horas.component.html',
  styleUrl: './lancamento-horas.component.scss'
})
export class LancamentoHorasComponent {

  constructor(private lancamentoHorasService: LancamentoHorasService, private authService: AuthService, private route: ActivatedRoute, private router: Router, private atividadeService: AtividadeService) {
      this.router = router;
      //this.idUsuario = this.authService.getUsuarioId();
  }

  dataInicio: string = '';
  dataFim: string = '';
  tempoDuracao: string = '';
  //idUsuario: number;
  atividades: Atividade[] = [];
  lancamento!: LancamentoHoras;

  lancamentoHoras: LancamentoHoras ={
    id: 0,
    descricao: '',
    dataInicio: '',
    dataFim: '',
    dataRegistro: '',
    tempoDuracao: '',
    idAtividade: 0,
    idUsuario: 0,
    nomeUsuarioResponsavel: ''
  }

  ngOnInit(): void{
    this.carregarLancamento();
  }

  carregarLancamento(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const idNumber = Number(id);
      this.lancamentoHorasService.findById(idNumber).subscribe({
        next: (lancamento) => {
          this.lancamentoHoras = lancamento;
        },
        error: (error) => {
          console.error('Erro ao buscar lancamento:', error);
        }
      });
    }
  }

}
