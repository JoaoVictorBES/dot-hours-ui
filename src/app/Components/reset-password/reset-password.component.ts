import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  token: string = '';
  newPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  resetPassword() {
    this.http.post('http://localhost:8080/api/auth/reset-password', { token: this.token, newPassword: this.newPassword })
      .subscribe(response => {
        alert('Senha redefinida com sucesso!');
        this.router.navigate(['/login']);
      });
  }
  /*email: string = '';
  token: string = '';
  newPassword: string = '';
  step: number = 1;
  
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  // Enviar e-mail para recuperação
  recoverPassword() {
    this.authService.recoverPassword(this.email).subscribe({
      next: () => {
        alert('E-mail enviado com sucesso! Verifique sua caixa de entrada.');
        this.step = 2; // Avança para a próxima etapa
      },
      error: (err) => alert('Erro ao enviar e-mail: ' + err.message)
    });
  }

  // Validar token
  validateToken() {
    this.authService.validateToken(this.token).subscribe({
      next: () => {
        alert('Token validado. Agora defina sua nova senha.');
        this.step = 3; // Avança para redefinir a senha
      },
      error: (err) => alert('Token inválido ou expirado.')
    });
  }

  // Alterar senha
  changePassword() {
    this.authService.changePassword(this.token, this.newPassword).subscribe({
      next: () => {
        alert('Senha alterada com sucesso! Faça login novamente.');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Erro ao alterar senha.')
    });
  }*/

}
