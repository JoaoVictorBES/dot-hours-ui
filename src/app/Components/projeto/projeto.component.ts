import { Component, OnInit } from '@angular/core';
import { Projeto } from '../../Models/projeto';
import { ProjetoService } from '../../Services/projeto.service';

@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [],
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent implements OnInit {

  projetos: Projeto[] = [];

  constructor(private projetoService: ProjetoService) {}

  ngOnInit(): void {
    this.projetoService.getProjetos().subscribe(data => {
      this.projetos = data;
    });
  }

}
