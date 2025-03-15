import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUserRole();

    if (user && user.role === 'ROLE_ADMIN') {
      return true;
    }

    this.router.navigate(['dashboard/admin']);
    return false;
  }
}
