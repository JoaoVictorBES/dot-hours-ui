import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LancamentoHoras } from '../../../Models/lancamento-horas';
import { LancamentoHorasService } from '../../../Services/lancamento-horas.service';
import { Atividade } from '../../../Models/atividade';

@Component({
  selector: 'app-editar-lancamento',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './editar-lancamento.component.html',
  styleUrl: './editar-lancamento.component.scss'
})
export class EditarLancamentoComponent {

  constructor(private lancamentoHorasService: LancamentoHorasService, private route: ActivatedRoute, router: Router) {
      this.router = router;
  }

  router: Router;
  dataInicio: string = '';
  dataFim: string = '';
  tempoDuracao: string = '';
  atividades: Atividade [] = [];
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

  editarLancamento(): void {
    
    if (!this.lancamento || !this.lancamento.id) {
      console.error('lancamento inválido para edição.');
      return;
    }

    const confirmar = confirm('Tem certeza que deseja editar esta lancamento?');
  
    if (confirmar) {
      this.lancamentoHorasService.update(this.lancamento.id, this.lancamento).subscribe({
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

  carregarLancamento(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const idNumber = Number(id);
      this.lancamentoHorasService.findById(idNumber).subscribe({
        next: (lancamento) => {
          this.lancamento = lancamento;
        },
        error: (error) => {
          console.error('Erro ao buscar lancamento:', error);
        }
      });
    }
  }

  deletarLancamento(id: number | undefined): void {
    if (!id) {
      console.error('ID do lançamento é inválido.');
      return;
    }
  
    const confirmar = confirm('Tem certeza que deseja excluir este lançamento?');
    
    if (confirmar) {
      this.lancamentoHorasService.delete(id).subscribe({
        next: () => {
          alert('Lançamento deletado com sucesso!');
          this.router.navigate(['/listar/lancamentos']);
        },
        error: (error) => {
          console.error('Erro ao deletar lançamento:', error);
          alert('Erro ao tentar excluir o lançamento.');
        }
      });
    }
  }

  calcularDuracao() {
    
    if (this.dataInicio && this.dataFim) {
      const inicio = this.converterParaMinutos(this.dataInicio);
      const fim = this.converterParaMinutos(this.dataFim);
 
      if (fim >= inicio) {
        const duracaoMinutos = fim - inicio;
        this.tempoDuracao = this.converterParaHoraMinuto(duracaoMinutos);
        
        this.lancamentoHoras.tempoDuracao = this.tempoDuracao;

      } else {
        alert('O horário de fim deve ser maior que o de início!');
      }
    }
  }
  
  converterParaMinutos(horario: string): number {
    const [horas, minutos] = horario.split(':').map(Number);
    return horas * 60 + minutos;
  }

  converterParaHoraMinuto(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const min = minutos % 60;
    return `${this.formatarNumero(horas)}:${this.formatarNumero(min)}`;
  }

  formatarNumero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`; 
  }

  formatDateTime(date: string, time: string): string {
    return `${date}T${time}:00`;
  }

  converterParaLocalTime(tempo: string): string {
    const [horas, minutos] = tempo.split(':').map(Number);
    return `${this.formatarNumero(horas)}:${this.formatarNumero(minutos)}`;
  }



}
