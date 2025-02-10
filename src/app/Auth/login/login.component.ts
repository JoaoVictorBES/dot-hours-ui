import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';
import { UsuarioLogin } from '../../Models/usuarioLogin';
import { Login } from '../../Models/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  
  usuarioLogin: UsuarioLogin = new UsuarioLogin();
  login: Login = new Login();

  constructor(private loginService: LoginService) {}
 

  logar() {
    this.loginService.login(this.usuarioLogin.username, this.usuarioLogin.password).subscribe({
      next: response => alert(response),
      error: () => alert('Credenciais inválidas!')
    });
  }
 

}
