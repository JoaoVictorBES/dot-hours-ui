import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projeto } from '../Models/projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {


  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/projetos";

  
  constructor() { }

  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.API);
  }

}
