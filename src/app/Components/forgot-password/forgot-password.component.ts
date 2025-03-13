import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  email: string = '';

  constructor(private http: HttpClient) {}

  requestPasswordReset(email: string) {
    this.http.post('http://localhost:8080/api/auth/forgot-password', { email })
    .subscribe(
      (response) => {
        console.log('E-mail enviado com sucesso');
      },
      (error) => {
        console.error('Erro ao enviar o e-mail de recuperação', error);
      }
    );
  }

}
