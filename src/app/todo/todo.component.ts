import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TodoService } from '../todo.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  createForm;
  todoList;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private todo: TodoService,
    private snackbar: MatSnackBar,
  ){
    this.createForm = this.formBuilder.group({
      text: ''
    });
  }

  async loadTodos(){
    this.todoList = await this.todo.getTodos();
  }

  alert(message){
    this.snackbar.open(message, 'Dismiss', {duration: 3000});
  }

  async ngOnInit(){
    this.loadTodos();
  }

  async toggle(event, id){
    // console.log(event.checked);
    const result = this.todo.toggleStatus(id, event.checked);
    if(!('error' in result))
      this.alert("Updated");
  }

  async deleteTodo(id){
    let result = await this.todo.deleteTodo(id);
    this.loadTodos();
    this.alert('Deleted!');

  }

  async onSubmit(todoData){
    let result: any =  await this.todo.createTodo(todoData);
    if('error' in result){
      console.log(result.error);
    }else{
      this.alert("Todo Created!");
    }
    this.loadTodos();
    this.createForm.reset();

  }

 

}
