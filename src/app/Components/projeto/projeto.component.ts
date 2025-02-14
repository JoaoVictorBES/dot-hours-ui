import { Component, OnInit } from '@angular/core';
import { Projeto } from '../../Models/projeto';
import { ProjetoService } from '../../Services/projeto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent implements OnInit {

  projeto: Projeto[] = [];

  constructor(private projetoService: ProjetoService) {}

  ngOnInit(): void {
    this.projetoService.findAll().subscribe(data => {
      this.projeto = data;
    });
  }



}
