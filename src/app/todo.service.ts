import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  httpOptions;
  server;

  //CRUD METHODS
  //We call toPromise() so that all methods return a promise
  createTodo(text){
    return this.http.post(`${this.server}/todos`, {text}, this.httpOptions).toPromise();
  }

  getTodos(){
    return this.http.get(`${this.server}/todos`, this.httpOptions).toPromise();
  }

  updateTodo(id, text){
    return this.http.put(`${this.server}/todos/${id}`, {text}, this.httpOptions).toPromise();
  }

  toggleStatus(id){
    return this.http.get(`${this.server}/toggle/${id}`, this.httpOptions).toPromise();
  }

  constructor(
    private auth:AuthService,
    private http: HttpClient,
  ) { 

    // Configuration parameter for http.get,post,put etc
    this.httpOptions = {
      headers : new HttpHeaders({//set headers using HttpHeaders()
                  'Content-Type': 'application/json',
                  'Authorization': `JWT ${this.auth.getToken()}`
                }
      )
    };

    this.server = "";
  }
}
