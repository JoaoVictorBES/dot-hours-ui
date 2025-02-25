import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/usuarios";

  constructor() { }

  create(usuario: Usuario): Observable<Usuario>{

    return this.http.post<Usuario>(`${this.API}/cadastro`, usuario);

  }

  findAll(): Observable<Usuario[]> {
        
        return this.http.get<Usuario[]>(`${this.API}/findAll`,);
    
  }
  
}
