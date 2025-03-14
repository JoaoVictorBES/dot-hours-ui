import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LancamentoHorasService } from '../../../Services/lancamento-horas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LancamentoHoras } from '../../../Models/lancamento-horas';
import { Atividade } from '../../../Models/atividade';
import { AtividadeService } from '../../../Services/atividade.service';
import { AuthService } from '../../../Auth/auth.service';


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
export class CadastroLancamentoHorasComponent {


  constructor(private lancamentoHorasService: LancamentoHorasService, private authService: AuthService, private route: ActivatedRoute, private router: Router, private atividadeService: AtividadeService) {
    this.router = router;
    this.idUsuario = this.authService.getUsuarioId();
  }

  dataInicio: string = '';
  dataFim: string = '';
  tempoDuracao: string = '';
  idUsuario: number;

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

  atividades: Atividade [] = [];

  atividade: Atividade | null = null;

  
  ngOnInit(): void {
    this.idUsuario = this.authService.getUsuarioId();

    this.atividadeService.listAll().subscribe((data) => {
      this.atividades = data;
      console.log("Atividades carregadas:", this.atividades);
    });

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

  lancarHoras(): void {
    // Se o usuário estiver logado, obtém seu ID; caso contrário, permite o envio sem ID
    const user = this.authService.getUser();
    console.log("Usuário recuperado do localStorage:", user);

    if (user && user.id !== null) {
      this.lancamentoHoras.idUsuario = user.id;
    } else {
      alert('Usuário não encontrado ou ID inválido!');
      return;
    }
    
    console.log(localStorage.getItem('user'));

    console.log('Usuário logado:', user);
  
    // Valida se todos os campos necessários estão preenchidos (exceto idUsuario)
    if (!this.lancamentoHoras.idAtividade || !this.lancamentoHoras.descricao || !this.dataInicio || !this.dataFim) {
      alert('Por favor, preencha todos os campos necessários!');
      return;
    }
  
    console.log('ID do usuário:', this.lancamentoHoras.idUsuario);
  
    // Ajusta dataInicio e dataFim para o formato correto antes de enviar
    //this.lancamentoHoras.dataInicio = this.formatDateTime(this.lancamentoHoras.dataRegistro, this.dataInicio).replace('T', ' ');
    //this.lancamentoHoras.dataFim = this.formatDateTime(this.lancamentoHoras.dataRegistro, this.dataFim).replace('T', ' ');

    this.lancamentoHoras.dataInicio = this.formatTime(this.dataInicio);
    this.lancamentoHoras.dataFim = this.formatTime(this.dataFim);
  
    // Ajusta o tempoDuracao para o formato correto
    this.lancamentoHoras.tempoDuracao = this.converterParaLocalTime(this.tempoDuracao);
  
    this.lancamentoHoras.idUsuario = Number(this.lancamentoHoras.idUsuario);

    console.log("🔍 Dados enviados para o backend:", this.lancamentoHoras);

    // Chama o serviço para criar o lançamento de horas
    this.lancamentoHorasService.create(this.lancamentoHoras).subscribe(
      (response) => {
        console.log('Horas lançadas com sucesso:', response);
        this.router.navigate(['/listar/projetos']);
        alert('Lançamento de horas realizado com sucesso!');
      },
      (error) => {
        console.error('Erro ao lançar horas:', error);
        alert(`Erro ao lançar as horas: ${error.error?.message || 'Erro desconhecido'}`);
      }
    );
  }
  
  formatTime(time: string): string {
    return time.length === 5 ? `${time}:00` : time; // Garante que o formato seja HH:mm:ss
  }
  

}



