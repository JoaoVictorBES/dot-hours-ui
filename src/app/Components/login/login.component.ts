import { Component, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Login } from '../../Models/Login';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  

  constructor(router: Router) {
    this.router = router;
    this.authService.removerToken();
  }
 

  logar() {
    this.authService.login(this.login).subscribe({
      next: token => {
        if (token) {
          this.authService.addToken(token);
          const user = this.authService.decodeToken(token);
          this.authService.saveUser(user);
          console.log("Salvando usuário:", user);
  
          // Verifica o papel do usuário e redireciona para a rota correspondente
          if (user.role === 'ADMIN') {
            this.router.navigate(['/dashboard/admin']);
          } else {
            this.router.navigate(['/dashboard/usuario']);
          }
  
        } else {
          alert('Usuário ou senha incorretos!');
        }
      },
      error: erro => {
        alert('Deu erro');
      }
    });
  }
  
 

}
