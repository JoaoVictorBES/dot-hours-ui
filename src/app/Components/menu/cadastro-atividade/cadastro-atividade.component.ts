import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusProjeto } from '../../../Enums/status-projeto.enum';
import { Projeto } from '../../../Models/projeto';
import { AtividadeService } from '../../../Services/atividade.service';
import { Atividade } from '../../../Models/atividade';
import { StatusAtividade } from '../../../Enums/status-atividade.enum';
import { Usuario } from '../../../Models/usuario';
import { CommonModule } from '@angular/common';
import { ProjetoService } from '../../../Services/projeto.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cadastro-atividade',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
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
    '',
    ''
  );
  

  ngOnInit(): void {
    this.carregarProjetos();
    this.carregarUsuarios();
  }

  
  carregarAtividades(): void {
    this.atividadeService.findAll().subscribe(
      (atividades: Atividade[]) => {
        console.log('atividades', atividades)
        this.listaAtividades = atividades;
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
    this.usuarioService.findAll().subscribe(
      (usuarios: Usuario[]) => {
        console.log('usuarios', usuarios)
        this.usuarios = usuarios;
      },
      (erro: any) => {
        console.error('Erro ao carregar usuarios', erro);
      }
    )
  }
 
  create(): void {
  //debugger;
    if (!this.atividade.status) {
        this.atividade.status = StatusAtividade.PENDENTE;
    }

    // Convertendo idUsuarioVinculado e idProjetoVinculado para number
    this.atividade.idUsuarioVinculado = Number(this.atividade.idUsuarioVinculado);
    this.atividade.idProjetoVinculado = Number(this.atividade.idProjetoVinculado);
    
    // Convertendo a data para o formato correto (yyyy-MM-dd)
    this.atividade.dataInicio = this.atividade.dataInicio.split('T')[0];
    this.atividade.dataFim = this.atividade.dataFim.split('T')[0];

    //this.atividade.dataCriacao = this.atividade.dataFim.split('T')[0];

    console.log('Atividade a ser criada:', JSON.stringify(this.atividade, null, 2));


    this.atividadeService.create(this.atividade).subscribe(
        (response: Atividade) => {
            console.log('Atividade criada:', response);
            this.atividade = response;
            this.router.navigate(['/listar/atividades']);
        },
        (error) => {
            console.error('Erro ao criar atividade:', error);
        }
    );
  }
  


}
