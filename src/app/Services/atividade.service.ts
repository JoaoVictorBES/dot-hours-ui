import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Atividade } from '../Models/atividade';
import { Router } from '@angular/router';
import { StatusAtividade } from '../Enums/status-atividade.enum';
import { Usuario } from '../Models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/atividades";

  router = inject(Router);

  constructor() { }


  findAll(page: number = 0, size: number = 8): Observable<any> {
      
   /*let token = '';

    if (typeof window !== 'undefined') {
       token = localStorage.getItem('token') || '';
    }

    console.log('Token enviado:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);*/

    return this.http.get<any>(`${this.API}/findAll?page=${page}&size=${size}`);

  }

  listAll(): Observable<Atividade[]> {
    return this.http.get<Atividade[]>(`${this.API}/listAll`);
  }

  

  create(atividade: Atividade): Observable<Atividade> {
      
    atividade.ativo = true;
    
    const token = (typeof window !== 'undefined' && localStorage) ? localStorage.getItem('token') : null;

    if (!token) {
      console.error('Token ausente! Faça login novamente.');
      return throwError('Token ausente! Faça login novamente.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    console.log('Token enviado no header:', token);
    
    atividade.status = StatusAtividade[atividade.status as keyof typeof StatusAtividade]; // Garante que o status seja um enum válido

    return this.http.post<Atividade>(`${this.API}/create`, atividade, { headers }).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.router.navigate(['/dashboard/admin']);
        }
        return throwError(error);
      })
    );
  }


   findById(id: number): Observable<Atividade>{
  
      const token = localStorage.getItem('token'); // Pegando o token do localStorage
  
      console.log('Token enviado:', token);
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.get<Atividade>(`${this.API}/findById/${id}`, { headers }).pipe(
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

  update(id: number, atividade: Atividade): Observable<Atividade> {
      const token = localStorage.getItem('token'); // Pegando o token do localStorage
      console.log('Token enviado:', token);
    
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
      return this.http.put<Atividade>(`${this.API}/update/${id}`, atividade, { headers });
  }

  toggleAtivo(id: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put(`${this.API}/toggle-status/${id}`, {}, { headers, responseType: 'text' });
  }
  
  filtrarAtividades(filtros: any): Observable<Atividade[]> {
    let params = new HttpParams();

    if (filtros.nome) params = params.set('nome', filtros.nome);
    if (filtros.status) params = params.set('status', filtros.status);
    if (filtros.idProjeto) params = params.set('idProjeto', filtros.idProjeto);
    if (filtros.dataInicio) params = params.set('dataInicio', filtros.dataInicio);
    if (filtros.dataFim) params = params.set('dataFim', filtros.dataFim);

    return this.http.get<Atividade[]>(`${this.API}/findByFilters`, { params });
  }

  findAtividadeByIdUsuario(id: number): Observable<Atividade[]>{
  
    const token = localStorage.getItem('token'); // Pegando o token do localStorage

    console.log('Token enviado:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Atividade[]>(`${this.API}/findAtividadeByIdUsuario/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.router.navigate(['/dashboard/admin']); // Redireciona para login se não estiver autenticado
        }
        return throwError(error);
      })
    );

  }
   

}
