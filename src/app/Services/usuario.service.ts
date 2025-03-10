import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../Models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);

  router = inject(Router);
  
  API = "http://localhost:8080/api/usuarios";

  constructor() { }

  create(usuario: Usuario): Observable<Usuario>{

    const token = localStorage.getItem('token');
        
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    console.log('Token enviado no header:', token);

    return this.http.post<Usuario>(`${this.API}/cadastro`, usuario, { headers }).pipe(
          catchError(error => {
            if (error.status === 403) {
              this.router.navigate(['/dashboard/admin']);
            }
            return throwError(error);
          })
        );

  }

  findAll(): Observable<Usuario[]> {
        
        return this.http.get<Usuario[]>(`${this.API}/findAll`,);
    
  }

  findById(id: number): Observable<Usuario>{
  
      const token = localStorage.getItem('token'); // Pegando o token do localStorage
  
      console.log('Token enviado:', token);
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.get<Usuario>(`${this.API}/findById/${id}`, { headers }).pipe(
        catchError(error => {
          if (error.status === 403) {
            this.router.navigate(['/dashboard/admin']); // Redireciona para login se não estiver autenticado
          }
          return throwError(error);
        })
      );
  
    }

    delete(id: number): Observable<string>{
    
      const token = localStorage.getItem('token'); // Pegando o token do localStorage
  
      console.log('Token enviado:', token);
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.delete(`${this.API}/delete/${id}` , { headers, responseType: 'text'}).pipe(
        catchError(error => {
          if (error.status === 403) {
            this.router.navigate(['/dashboard/admin']); // Redireciona para login se não estiver autenticado
          }
          return throwError(error);
        })
      );
  
    }


     update(id: number, usuario: Usuario): Observable<Usuario> {
        const token = localStorage.getItem('token'); // Pegando o token do localStorage
        console.log('Token enviado:', token);
      
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
        return this.http.put<Usuario>(`${this.API}/update/${id}`, usuario, { headers });
      }
     
  
}
