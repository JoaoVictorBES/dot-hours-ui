import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../Models/Login';
import { Usuario } from '../Models/usuario';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/login";

  constructor() { }

  
  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {responseType: 'text' as 'json' });
  }

  addToken(token: string){

    localStorage.setItem('token', token)

  }

  removerToken(){

    localStorage.removeItem('token')

  }

  getToken(){

    return localStorage.getItem('token')

  }

  jwtDecode(): any {
    let token = this.getToken();
    if (token) {
        return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Usuario;
    if (user.role == role)
      return true;
    else
      return false;
  }
  
}
