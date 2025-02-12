import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';
import { Login } from '../../Models/Login';
import { Router } from 'express';
import { CommonModule } from '@angular/common';

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

  router = inject(Router)
  login: Login = new Login();
  loginService = inject(LoginService)

  constructor() {}
 

  logar() {
   
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if(token){
          this.loginService.addToken(token);
          this.router.navigate(['/dashboard-admin'])
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
