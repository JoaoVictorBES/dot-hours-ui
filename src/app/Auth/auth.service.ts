import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../Models/Login';
import { Usuario } from '../Models/usuario';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = "http://localhost:8080/api/login";

  private api = "http://localhost:8080/api/auth"

  private user: Usuario | null = null ;
  

  constructor(private http: HttpClient, private router: Router) {}

  login(login: Login): Observable<any> {

    return this.http.post<any>(this.API, login, {responseType: 'text' as 'json' }) 
     
  }

  setUser(usuario: any) {
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  getUser(): Usuario | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  }

  getUsuarioId(): number {
    const user = this.getUser();
    return user && user.id !== null ? user.id : 0;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  jwtDecode(): JwtPayload | null {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasPermission(role: string): boolean {
    const user = this.jwtDecode() as Usuario | null;
    return user?.role === role;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  addToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token salvo:', token); // Debugging
    } else {
      console.error('Tentativa de salvar um token inválido!');
    }
  }

  removerToken(){

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }

  }

    decodeToken(token: string): Usuario {
      const decoded: any = jwtDecode(token);
      return {
          id: decoded.id,
          username: decoded.sub, // `sub` geralmente contém o nome de usuário
          role: decoded.role, // Se houver papéis no token
          email: decoded.email,
          password: decoded.password,
          dataCriacao: decoded.dataCriacao,
          ultimoLogin: decoded.ultimoLogin,
          atividades: decoded.atividades
      };
    }

    saveUser(user: Usuario): void {
      console.log("Salvando usuário:", user); 
      localStorage.setItem('user', JSON.stringify(user));
    }

     // Enviar solicitação de recuperação de senha
  recoverPassword(email: string): Observable<any> {
    const token = localStorage.getItem('token'); // Pegando o token do localStorage
      
    console.log('Token enviado:', token);
      
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.api}/forgot-password`, { email }, { headers });
  }

  // Validar o token recebido por e-mail
  validateToken(token: string): Observable<any> {
    return this.http.post(`${this.api}/reset-password?token=${token}`, {});
  }

  // Alterar a senha com o novo token
  changePassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.api}/change-password?token=${token}`, { newPassword });
  }

}
