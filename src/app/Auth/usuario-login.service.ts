import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLoginService {

  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/usuario";


  constructor() { }

  create(usuario: Usuario): Observable<Usuario>{

    return this.http.post<Usuario>(`${this.API}/cadastro`, usuario);

  }


}
