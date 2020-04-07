import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  httpOptions;
  server;

  //CRUD METHODS
  //We call toPromise() so that all methods return a promise
  createTodo({text}){
    return this.http.post(`${environment.server}/todos.json`, {text, done:false}, this.httpOptions).toPromise();
  }

  async getTodos(){
    let todos = [];
    
    let observable = this.http.get(`${environment.server}/todos.json`, this.httpOptions);
    let data = await observable.toPromise();

    for(let [key, value] of Object.entries(data)){
      value.id = key;
      todos.push(value);
    }

    return todos;
  }

  async deleteTodo(id){
    const observable = this.http.delete(`${environment.server}/todos/${id}.json`, this.httpOptions);
    let result = await observable.toPromise();
    return result;
  }

  updateTodo(id, text){
    return this.http.put(`${environment.server}/todos/${id}.json`, {text}, this.httpOptions).toPromise();
  }

  toggleStatus(id, done){
    return this.http.put(`${environment.server}/todos/${id}/done.json`, done, this.httpOptions).toPromise();
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

  }
}
