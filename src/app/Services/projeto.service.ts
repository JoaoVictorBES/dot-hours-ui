import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Projeto } from '../Models/projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {


  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/projetos";

  router = inject(Router);

  constructor() { }

  create(projeto: Projeto): Observable<Projeto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('Token enviado no header:', token);
    
    return this.http.post<Projeto>(`${this.API}`, projeto, { headers }).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.router.navigate(['/dashboard/admin']);
        }
        return throwError(error);
      })
    );
  }
  

  findAll(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.API}/listAll`);

  }

  findById(id: number): Observable<Projeto>{

    return this.http.get<Projeto>(`${this.API}/${id}`)

  }

  
   

 
}