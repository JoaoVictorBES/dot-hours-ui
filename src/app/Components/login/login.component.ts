import { Component, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Login } from '../../Models/Login';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/login.service';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  router: Router;
  login: Login = new Login();
  loginService = inject(LoginService)

  constructor(router: Router) {
    this.router = router;
    this.loginService.removerToken();
  }
 

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if(token){
          this.loginService.addToken(token);
          this.router.navigate(['/dashboard/admin'])
        }else{
          alert('Usuário ou senha incorretos!');
        }
      },
      error: erro =>{
        alert('Deu erro');
      }
    })

  }
 

}
