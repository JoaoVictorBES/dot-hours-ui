
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  API = "http://localhost:8080/api/";

  constructor() { }
}
