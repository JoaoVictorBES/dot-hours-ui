import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  nome = '';
  senha = '';

  constructor(private loginService: LoginService) {}

  login() {
    this.loginService.login(this.nome, this.senha).subscribe({
      next: response => alert(response),
      error: () => alert('Credenciais inválidas!')
    });
  }
 

}
