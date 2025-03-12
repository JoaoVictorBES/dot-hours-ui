import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
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
    
    return this.http.post<Projeto>(`${this.API}/create`, projeto, { headers }).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.router.navigate(['/dashboard/admin']);
        }
        return throwError(error);
      })
    );
  }
  

  findAll(page: number = 0, size: number = 8): Observable<any> {

    return this.http.get<any>(`${this.API}/findAll?page=${page}&size=${size}`)
    
  }


  findById(id: number): Observable<Projeto>{

    const token = localStorage.getItem('token'); // Pegando o token do localStorage

    console.log('Token enviado:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Projeto>(`${this.API}/findById/${id}`, { headers }).pipe(
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

  update(id: number, projeto: Projeto): Observable<Projeto> {
    const token = localStorage.getItem('token'); // Pegando o token do localStorage
    console.log('Token enviado:', token);
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<Projeto>(`${this.API}/update/${id}`, projeto, { headers });
  }

  filtrarProjetos(nome?: string, status?: string, prioridade?: string, dataInicio?: string): Observable<Projeto[]> {
    let params = new HttpParams();

    if (nome) params = params.set('nome', nome);
    if (status) params = params.set('status', status);
    if (prioridade) params = params.set('prioridade', prioridade);
    if (dataInicio) params = params.set('dataInicio', dataInicio);

    return this.http.get<Projeto[]>(`${this.API}/filter`, { params });
  }
 
}