import { Component } from '@angular/core';
import { Projeto } from '../../../Models/projeto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../Models/usuario';
import { ProjetoService } from '../../../Services/projeto.service';
import { PrioridadeProjeto } from '../../../Enums/prioridade-projeto.enum';
import { StatusProjeto } from '../../../Enums/status-projeto.enum';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cadastro-projeto',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './cadastro-projeto.component.html',
  styleUrl: './cadastro-projeto.component.scss'
})
export class CadastroProjetoComponent {

  router: Router;

  constructor(private projetoService: ProjetoService, router: Router) {

    this.router = router;

  }

  projeto: Projeto = new Projeto(0, '', '', '', '', '', 0, '', '', []);

  statusOptions = Object.values(StatusProjeto); // Transforma o enum em array de valores
  prioridadeOptions = Object.values(PrioridadeProjeto);

  create(): void {

    this.projetoService.create(this.projeto).subscribe(
      (response) => {
        console.log('Projeto criado com sucesso:', response);
        this.router.navigate(['/listar/projetos']);
        // Redirecione ou mostre uma mensagem de sucesso, conforme necessário
      },
      (error) => {
        console.error('Erro ao criar projeto:', error);
        // Trate o erro de forma adequada, como mostrar uma mensagem de erro
      }
    );
  }

}
