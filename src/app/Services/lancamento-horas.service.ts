import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LancamentoHoras } from '../Models/lancamento-horas';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoHorasService {

  http = inject(HttpClient);
  
  API = "http://localhost:8080/api/lancar-horas";

  router = inject(Router);

  constructor(private authService: AuthService) { }

  create(lancamentoHoras: LancamentoHoras): Observable<LancamentoHoras> {
    
    const token = localStorage.getItem('token');
    
    console.log("Token decodificado:", this.authService.jwtDecode());// Pegando o token do localStorage
  
    console.log('Token enviado:', token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<LancamentoHoras>(`${this.API}/create`, lancamentoHoras, { headers }).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.router.navigate(['/dashboard/admin']);
        }
        return throwError(error);
      })
    );
  }

  findAll(page: number = 0, size: number = 8): Observable<any> {

    return this.http.get<any>(`${this.API}/findAll?page=${page}&size=${size}`);
    
  }

  update(id: number, lancamentoHoras: LancamentoHoras): Observable<LancamentoHoras> {
      const token = localStorage.getItem('token'); // Pegando o token do localStorage
      console.log('Token enviado:', token);
    
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
      return this.http.put<LancamentoHoras>(`${this.API}/update/${id}`, lancamentoHoras, { headers });
  }

  findById(id: number): Observable<LancamentoHoras>{
  
      const token = localStorage.getItem('token'); // Pegando o token do localStorage
  
      console.log('Token enviado:', token);
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.get<LancamentoHoras>(`${this.API}/findById/${id}`, { headers }).pipe(
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

  filtrarLancamentos(idUsuario?: string, idAtividade?: string, idProjeto?: string, dataRegistro?: string): Observable<LancamentoHoras[]> {
    const params: any = {};

    if (idUsuario) params.idUsuario = idUsuario;
    if (idAtividade) params.idAtividade = idAtividade;
    if (idProjeto) params.idProjeto = idProjeto;
    if (dataRegistro) params.dataRegistro = dataRegistro;

    return this.http.get<LancamentoHoras[]>(`${this.API}/search`, { params });
}

}
