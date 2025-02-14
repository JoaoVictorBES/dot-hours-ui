import { Component } from '@angular/core';
import { Projeto } from '../../../../Models/projeto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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

  projeto!: Projeto;

  create(){
    
  }

}
