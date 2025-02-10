import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atividade } from '../Models/atividade';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/atividades";

  constructor() { }


  getAtividades(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(this.API);
  }

}
