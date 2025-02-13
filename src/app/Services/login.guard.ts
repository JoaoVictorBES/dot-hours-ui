import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {


  let loginService = inject(LoginService);

  if(loginService.hasPermission("USER") && state.url == 'cadastro-usuario'){
    alert('Você não tem permissão de acesso a essa rota!');
    return false;
  }

  return true;
};
