import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Projeto } from '../../../../Models/projeto';

@Component({
  selector: 'app-listar-projetos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './listar-projetos.component.html',
  styleUrl: './listar-projetos.component.scss'
})
export class ListarProjetosComponent {

  projetos: any[] = [];

}
