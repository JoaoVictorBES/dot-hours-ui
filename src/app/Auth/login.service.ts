import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/login";

  constructor() { }

  
  login(nome: string, senha: string): Observable<string> {
    return this.http.post<string>(this.API, { nome, senha });
  }
  
}
