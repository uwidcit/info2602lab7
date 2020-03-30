import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  getToken() {
    return this.token;
  }

  token = null;

  login({username, password}) {
    this.token = "jwtToken";
  }

  isAuth(){
    return this.token != null;
  }

  constructor() { }
}
