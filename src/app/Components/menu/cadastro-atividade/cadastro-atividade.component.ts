import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Projeto } from '../../../Models/projeto';
import { AtividadeService } from '../../../Services/atividade.service';
import { Atividade } from '../../../Models/atividade';
import { StatusAtividade } from '../../../Enums/status-atividade.enum';
import { Usuario } from '../../../Models/usuario';
import { CommonModule } from '@angular/common';
import { ProjetoService } from '../../../Services/projeto.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';


declare var $: any;

@Component({
  selector: 'app-cadastro-atividade',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './cadastro-atividade.component.html',
  styleUrl: './cadastro-atividade.component.scss'
})
export class CadastroAtividadeComponent implements OnInit {
 
  
  constructor(private atividadeService: AtividadeService, router: Router, private projetoService: ProjetoService, private usuarioService: UsuarioService) {
  
    this.router = router;
  
  }
  
  listaProjetos: Projeto[] = [];

  listaAtividades: Atividade[] = [];

  router: Router;

  statusOptions = Object.values(StatusAtividade); 

  usuarios: Usuario[] =[];

  projetos: Projeto[] = [];

  atividade = new Atividade(
    '',
    '', 
    '',
    '',
    StatusAtividade.PENDENTE,
    '',
    '',
    true // Add the missing argument here
  );
  
  

  ngOnInit(): void {
    this.carregarProjetos();
    this.carregarUsuarios();
  }

 

  
  carregarAtividades(): void {
    this.atividadeService.findAll().subscribe(
      (atividades: Atividade[]) => {
        console.log('atividades', atividades)
      },
      (erro: any) => {
        console.error('Erro ao carregar projetos', erro);
      }
    );
  }

  carregarProjetos(): void {
    this.projetoService.findAll().subscribe(
      (projetos: Projeto[]) => {
        console.log('projetos', projetos)
        this.listaProjetos = projetos;
      },
      (erro: any) => {
        console.error('Erro ao carregar projetos', erro);
      }
    );
  }

  carregarUsuarios(): void {
    this.usuarioService.listAll().subscribe(
      (usuarios: Usuario[]) => {
        console.log('Usuários carregados:', usuarios);
        this.usuarios = usuarios;
      },
      (erro: any) => {
        console.error('Erro ao carregar usuarios', erro);
      }
    )
  }

 
  create(): void {
    // Certificando-se de que idUsuariosVinculados seja um array de números
    if (this.atividade.idUsuariosVinculados && Array.isArray(this.atividade.idUsuariosVinculados)) {
      this.atividade.idUsuariosVinculados = this.atividade.idUsuariosVinculados.map(id => Number(id));
    } else {
      // Se não houver ids vinculados, pode querer definir um valor default ou mostrar erro
      console.error('idUsuariosVinculados não está corretamente preenchido');
    }

    // Convertendo idProjetoVinculado para número
    if (this.atividade.idProjetoVinculado) {
      this.atividade.idProjetoVinculado = Number(this.atividade.idProjetoVinculado);
      if (isNaN(this.atividade.idProjetoVinculado)) {
        console.error('idProjetoVinculado inválido');
      }
    }
    
    // Formatando as datas corretamente
    // Formatando as datas com toISOString para garantir que a data esteja correta
    if (this.atividade.dataInicio && this.atividade.dataFim) {
      this.atividade.dataInicio = new Date(this.atividade.dataInicio).toISOString().split('T')[0];
      this.atividade.dataFim = new Date(this.atividade.dataFim).toISOString().split('T')[0];
    } else {
      console.error('Datas inválidas', this.atividade.dataInicio, this.atividade.dataFim);
    }

    this.atividade.ativo = true;

    console.log('Atividade a ser criada:', JSON.stringify(this.atividade, null, 2));

    this.atividadeService.create(this.atividade).subscribe(
        (response: Atividade) => {
            console.log('Atividade criada:', response);
            this.router.navigate(['/listar/atividades']);
        },
        (error: HttpErrorResponse) => {
            console.error('Erro ao criar atividade:', error);
            console.error('Detalhes do erro:', error.error);
        }
    );
}

  


}
