import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

}
