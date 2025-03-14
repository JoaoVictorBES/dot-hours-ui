import { Component } from '@angular/core';
import { UsuarioService } from '../../Services/usuario.service';
import { Atividade } from '../../Models/atividade';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../Models/usuario';
import { Projeto } from '../../Models/projeto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtividadeService } from '../../Services/atividade.service';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

  atividade: Atividade [] = [];

  usuario: Usuario = new Usuario(0, '', '', '', '', '', '', this.atividade);

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router, private atividadeService: AtividadeService) {}

  ngOnInit(): void {
    this.carregarUsuario();
    
  }

  private carregarUsuario(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const idNumber = Number(id);
  
      // Verifique se está no ambiente de navegador
      if (typeof window !== 'undefined' && window.localStorage) {
        // Aqui você pode acessar o localStorage sem problemas
        const usuarioData = localStorage.getItem('usuario'); // Exemplo de acesso ao localStorage
      }
  
      // Buscar dados do usuário
      this.usuarioService.findById(idNumber).subscribe({
        next: (usuario) => {
          this.usuario = usuario;
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
        }
      });
  
      // Buscar atividades vinculadas ao usuário
      this.usuarioService.findAtividadesByUsuario(idNumber).subscribe({
        next: (atividades) => {
          this.usuario.atividades = atividades;
          this.formatarHorasAtividade();
        },
        error: (error) => {
          console.error('Erro ao buscar atividades:', error);
        }
      });
      this.carregarAtividades(idNumber);
      console.log('id', idNumber);
    }
  }
  
  carregarAtividades(id: any): void {
    this.atividadeService.findAtividadeByIdUsuario(id).subscribe(
      (atividades: Atividade[]) => {
        this.usuario.atividades = atividades
        console.log('atividades', atividades)
      },
      (erro: any) => {
        console.error('Erro ao carregar projetos', erro);
      }
    );
  }
  

  voltar(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const rotaDestino = usuario.role === 'admin' ? '/dashboard/admin' : '/dashboard/usuario';

    this.router.navigate([rotaDestino]);
  }

  formatarHorasAtividade(): void {
    // Aqui você pode formatar as horas no formato que achar necessário, caso seja necessário
    this.usuario.atividades.forEach(atividade => {
      if (atividade.horasAtividade && atividade.horasAtividade.length > 0) {
        // Caso o formato não seja 'HH:mm:ss', você pode formatar conforme necessário aqui
        atividade.horasAtividade = this.formatarHora(atividade.horasAtividade);
      }
    });
  }

  // Função para garantir que a hora esteja no formato correto
  formatarHora(horas: string): string {
    const parts = horas.split(':');
    if (parts.length === 2) {
      // Se for apenas horas e minutos, adiciona os segundos como zero
      return `${parts[0]}:${parts[1]}:00`;
    }
    return horas; // Caso já esteja no formato correto
  }

}
