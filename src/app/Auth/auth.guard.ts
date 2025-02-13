import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AuthService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.AuthService.getUser();

    if (user && user.role === 'ADMIN') {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
