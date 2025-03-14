import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LancamentoHoras } from '../../../Models/lancamento-horas';
import { LancamentoHorasService } from '../../../Services/lancamento-horas.service';
import { Atividade } from '../../../Models/atividade';
import { AtividadeService } from '../../../Services/atividade.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../Auth/auth.service';

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

  constructor(private lancamentoHorasService: LancamentoHorasService, private route: ActivatedRoute, router: Router, private atividadeService: AtividadeService, private authService: AuthService) {
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
    this.carregarAtividades();
  }

  editarLancamento(): void {
    if (!this.lancamentoHoras || !this.lancamentoHoras.id) {
      console.error('Lançamento inválido para edição.');
      return;
    }
  
    const confirmar = confirm('Tem certeza que deseja editar este lançamento?');
  
    if (confirmar) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
      
      this.lancamentoHorasService.update(this.lancamentoHoras.id, this.lancamentoHoras, { headers }).subscribe({
        next: () => {
          alert('Lançamento editado com sucesso!');
          this.router.navigate(['/listar/lancamentos']);
        },
        error: (error) => {
          console.error('Erro ao editar lançamento:', error);
          alert('Erro ao tentar editar o lançamento.');
        }
      });
    }
  }
  

  carregarAtividades(): void {
      this.atividadeService.listAll().subscribe(
        (atividades: Atividade[]) => {
          this.atividades = atividades;
          console.log('atividades', atividades)
        },
        (erro: any) => {
          console.error('Erro ao carregar projetos', erro);
        }
      );
    }

  carregarLancamento(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const idNumber = Number(id);
      this.lancamentoHorasService.findById(idNumber).subscribe({
        next: (lancamento) => {
          this.lancamentoHoras = lancamento;
          console.log('lancamento', this.lancamentoHoras)
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
