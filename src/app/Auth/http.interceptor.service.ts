import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';



export const HttpInterceptorService: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);

  // inclui o token do localstorage em cada requisição http (header) //
  
  /*let token = localStorage.getItem('token');
  if (token && !router.url.includes('/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }*/

  if (typeof window !== 'undefined') {
    let token = localStorage.getItem('token');

    if (token && !router.url.includes('/login')) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + token },
      });
    }
  }

  // Tratamento das responses //
  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
	  
	  
        if (err.status === 401) { //401 - NON AUTHORIZED

          alert('401 - tratar aqui - tratar erro personalizado ');
          router.navigate(['/login']);


        } else if (err.status === 403) { //403 - FORBIDDEN

          alert('403 - tratar aqui - tratar erro personalizado ');
		  router.navigate(['/login']);

        } else {
          console.error('HTTP error:', err);
        }
		
		
      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );

}
